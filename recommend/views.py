from django.shortcuts import render

# Create your views here.
def recommend_view(request):
    return render(request, 'recommend.html')