import json
from django.shortcuts import render
from django.http import HttpResponse
from .pen import pen


def draw_view(request):
    return render(request, 'draw.html')


def draw_chart(request):
    pen(request.POST['diagram_name'],
        request.POST['dataset'],
        request.POST['target'],
        json.loads(request.POST['variables'])
        )
    return HttpResponse(status=200)
