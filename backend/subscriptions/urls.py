# subscriptions/urls.py

from django.urls import path
from .views import create_checkout_session
from . import views

urlpatterns = [
    path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('stripe-webhook/', views.stripe_webhook, name='stripe_webhook'),
]
