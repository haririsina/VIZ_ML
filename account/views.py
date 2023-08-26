from rest_framework import generics, permissions
from rest_framework.response import Response
from django.shortcuts import render, redirect
from knox.models import AuthToken

from .models import CustomUser

from .serializers import UserSerializer, LoginSerializer

class RegisterApiView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    
    def get(self, request, *args, **kwargs):
        return redirect("/account/")


register_api_view = RegisterApiView.as_view()


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

login_api_view = LoginApiView.as_view()


class CheckSessionApiView(generics.GenericAPIView):
    def get(self, request):
        return Response({'status': 200})

check_session_api_view = CheckSessionApiView.as_view()

def login_view(request):
    return render(request, 'account.html')
