from django.urls import path, include

from .views import *

urlpatterns = [
    path('', history_view),
    path('4631f492-e29b-4b75-92f0-68fh47980db8', diagram_list_api_view)
]
