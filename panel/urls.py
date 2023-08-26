from django.urls import path, include

from .views import *

urlpatterns = [
    path('', panel_view),
    path('draw/', include('draw.urls')),
    path('recommend/', include('recommend.urls')),
    path('history/', include('history.urls')),
]
