from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import Diagram
    
class DrawSerializer(serializers.Serializer):
    diagram_name = serializers.CharField(required=True)
    dataset = serializers.CharField(required=True)
    target = serializers.CharField(required=True)
    variables = serializers.CharField(required=True)


class RetreiveDigramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagram
        fields = '__all__'
        extra_kwargs = {
            'user': {'write_only': True},
        }
