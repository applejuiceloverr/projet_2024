from django.shortcuts import render
from rest_framework import generics
from .serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Account
#from rest_framework_simplejwt.views import TokenObtainPairView


class CreateAccountView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [AllowAny]


from django.contrib.auth import login
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserLoginSerializer
from .serializers import UserLoginSerializer, AccountSerializer

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            # Serialize the user data including 'nom' and 'prenom'
            user_data = AccountSerializer(user).data
            
            return Response({
                'user': user_data,
                'access_token': access_token
            }, status=status.HTTP_200_OK)
		
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response({
      'username' : user.username,
      'email' : user.email,
      'nom' : user.nom,
      'prenom' : user.prenom,
      'date_joined' : user.date_joined,
      'is_admin' : user.is_admin,
      'is_active' : user.is_active,
      'is_sub' : user.is_sub,
    })
