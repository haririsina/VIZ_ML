from rest_framework import generics

from .models import CustomUser

from .serializers import UserSerializer

class RegisterUser(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

register_user = RegisterUser.as_view()