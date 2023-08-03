import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .pen import pen


def draw_view(request):
    return render(request, 'draw.html')


def draw_chart(request):
    file_name = pen(request.POST['diagram_name'],
                    request.POST['dataset'],
                    request.POST['target'],
                    json.loads(request.POST['variables'])
                    )
    return JsonResponse(
        {
            "url": f"http://127.0.0.1:8000/media/{file_name}"
        },
        status=200
    )
