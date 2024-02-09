from django.contrib import admin
from .models import Venue


# Register your models here.
@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    pass
