import json
from django.shortcuts import render
from .pen import pen
from .models import Diagram
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import DrawSerializer

def draw_view(request):
    return render(request, 'draw.html')



class DrawChart(generics.GenericAPIView):
    serializer_class = DrawSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file_name = pen(
            serializer.validated_data['diagram_name'],
            serializer.validated_data['dataset'],
            serializer.validated_data['target'],
            json.loads(serializer.validated_data['variables'])
        )
            
        if file_name:
            Diagram(user=request.user, url=file_name).save()

        return Response(
            {
                "url": f"http://127.0.0.1:8000/media/{file_name}"
            }
        )


draw_chart = DrawChart.as_view()