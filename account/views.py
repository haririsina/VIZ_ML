from rest_framework import generics, permissions
from django.shortcuts import render

from .models import CustomUser

from .serializers import UserSerializer

class RegisterUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

register_user = RegisterUser.as_view()


def login_view(request):
    return render(request, 'account.html')