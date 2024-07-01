from rest_framework import serializers
from .models import Account
#from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'nom', 'prenom', 'password','username','is_staff',]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Account(**validated_data)
        user.username = validated_data.get('email')  # Set username to email
        user.set_password(password)
        user.save()
        return user
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user