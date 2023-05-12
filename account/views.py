from rest_framework import generics, permissions
from django.shortcuts import render, redirect

from .models import CustomUser

from .serializers import UserSerializer

class RegisterUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    
    def get(self, request, *args, **kwargs):
        return redirect("/account/")


register_user = RegisterUser.as_view()


def login_view(request):
    return render(request, 'account.html')