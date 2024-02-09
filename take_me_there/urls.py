"""
URL configuration for TakeMeThere project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from frontend.views import index
from django.conf import settings
from django.conf.urls.static import static
from take_me_there.apps.users.views import LoginView
from take_me_there.apps.events.views import LikeEventAPI, ListEventsAPI
from take_me_there.apps.venues.views import ListVenuesAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/login', LoginView.as_view()),
    path('api/events/<event_id>', LikeEventAPI.as_view()),
    path('api/events/', ListEventsAPI.as_view()),
    path('api/venues/', ListVenuesAPI.as_view()),
    re_path(r"^(?:.*)?$", index),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
