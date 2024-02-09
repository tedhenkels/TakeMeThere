from django.shortcuts import render
from take_me_there.settings import BASE_DIR


def index(request):
    return render(request, "../templates/index.html")
