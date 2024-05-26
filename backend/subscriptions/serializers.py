# subscriptions/serializers.py

from rest_framework import serializers

class CreateCheckoutSessionSerializer(serializers.Serializer):
    plan_type = serializers.ChoiceField(choices=['monthly', 'semiannual', 'annual'])