from django.shortcuts import render



def draw_view(request):
    return render(request, 'draw.html')