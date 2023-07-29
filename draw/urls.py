from django.urls import path

from .views import *

urlpatterns = [
    path('', draw_view),
    path('4631f492-e29b-4b75-92f0-68de73580db8', draw_chart)
]