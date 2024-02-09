from django.db import models
from django.contrib.auth.models import AbstractUser
from take_me_there.apps.events.models import Event


class UserProfile(AbstractUser):
    liked_events = models.ManyToManyField(Event)
