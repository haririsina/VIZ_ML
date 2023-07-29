import json
from django.shortcuts import render
from django.http import HttpResponse



def draw_view(request):
    return render(request, 'draw.html')


def draw_chart(request):
    # request.POST['diagram_name']
    # request.POST['dataset']
    # request.POST['target']
    # json.loads(request.POST['variables'])
    return HttpResponse(status=200)