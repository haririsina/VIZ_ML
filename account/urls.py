from django.urls import path, include

from .views import *

urlpatterns = [
    path('', login_view),
    path('register', register_api_view),
    path('login', login_api_view),
]
