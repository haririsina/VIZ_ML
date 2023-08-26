from django.shortcuts import render
import json
from draw.models import Diagram
from rest_framework import generics, permissions
from rest_framework.response import Response
from draw.serializers import RetreiveDigramsSerializer

# Create your views here.
def history_view(request):
    return render(request, 'history.html')



class DiagramsListApiView(generics.ListAPIView):
    serializer_class = RetreiveDigramsSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def list(self, request, *args, **kwargs):
        queryset = Diagram.objects.filter(user=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


diagram_list_api_view = DiagramsListApiView.as_view()