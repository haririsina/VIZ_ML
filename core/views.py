import os, json
from django.http import JsonResponse, HttpResponse
from django.conf import settings


def next_node(request):
    next_node_id = json.loads(request.body)['next_node_id']
    
    with open(os.path.join(settings.BASE_DIR, "core", "utils", "model.json"), "r", encoding="utf-8") as f:
        model_json = json.loads(f.read())

    try:
        next_node = model_json[next_node_id]
        return JsonResponse(next_node) 
    except:
        return HttpResponse(status=400)