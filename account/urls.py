from django.urls import path, include

from .views import *

urlpatterns = [
    path('', login_view),
    path('register', register_api_view),
    path('login', login_api_view),
    path('881a5d3f-6688-4c3f-a82f-767e69e1abf0', check_session_api_view)
]
