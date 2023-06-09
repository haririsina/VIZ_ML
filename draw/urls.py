from django.urls import path

from .views import *

urlpatterns = [
    path('', draw_view)
]