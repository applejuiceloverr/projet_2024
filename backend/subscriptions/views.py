# subscriptions/views.py
from stripe.error import InvalidRequestError
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
import stripe
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from Account.models import Account
import stripe
import os
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import CreateCheckoutSessionSerializer
from time import sleep

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe_webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

from .serializers import CreateCheckoutSessionSerializer

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from django.contrib.auth import get_user_model
from time import sleep

User = get_user_model()

def get_user_with_retry(stripe_customer_id, retries=5, delay=2):
    for _ in range(retries):
        try:
            return User.objects.get(stripe_customer_id=stripe_customer_id)
        except User.DoesNotExist:
            sleep(delay)
    print(f"No user found with stripe_customer_id {stripe_customer_id}")
    return None

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_checkout_session(request):
    print("CSRF Token:", request.headers.get('X-CSRFToken'))
    print("Authorization:", request.headers.get('Authorization'))
    
    serializer = CreateCheckoutSessionSerializer(data=request.data)
    if serializer.is_valid():
        plan_type = serializer.validated_data['plan_type']
    else:
        return JsonResponse(serializer.errors, status=400)

    if not plan_type:
        return JsonResponse({"error": "Plan type not provided"}, status=400)

    price_id_mapping = {
        'monthly': settings.STRIPE_PRICE_ID_MONTHLY,
        'semiannual': settings.STRIPE_PRICE_ID_SEMIANNUAL,
        'annual': settings.STRIPE_PRICE_ID_ANNUAL
    }

    price_id = price_id_mapping.get(plan_type)

    if not price_id:
        return JsonResponse({"error": "Invalid plan type"}, status=400)

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url='http://localhost:5173/success',
            cancel_url='http://localhost:5173/cancel',
        )

        return JsonResponse({'id': checkout_session.id})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, stripe_webhook_secret
        )
    except ValueError as e:
        # Invalid payload
        return JsonResponse({'error': str(e)}, status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return JsonResponse({'error': str(e)}, status=400)

    User = get_user_model()

    if event['type'] == 'invoice.payment_succeeded':
        customer_id = event['data']['object']['customer']
        print(f"Received payment success event for customer {customer_id}")
        user = get_user_with_retry(customer_id)
        if user:
            user.is_sub = True
            user.save()
            print(f"Updated is_sub for user {user.id}")

    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        customer_id = subscription['customer']
        status = subscription['status']
        print(f"Received subscription updated event for customer {customer_id} with status {status}")
        user = get_user_with_retry(customer_id)
        if user:
            user.is_sub = status == 'active'
            user.save()
            print(f"Updated is_sub for user {user.id} to {user.is_sub}")

    elif event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_id = session['customer']
        email = session['customer_details']['email']  # Assuming the customer's email is available

        try:
            user = User.objects.get(email=email)  # Fetch the user with the given email
            user.stripe_customer_id = customer_id  # Update the stripe_customer_id
            user.save()
            print(f"Updated stripe_customer_id for user {user.id}")
        except User.DoesNotExist:
            print(f"No user found with email {email}")

    return JsonResponse({'success': True})