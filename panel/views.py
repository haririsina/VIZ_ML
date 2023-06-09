from django.shortcuts import render



def panel_view(request):
    return render(request, 'panel.html')
