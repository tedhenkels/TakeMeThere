from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile


# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(UserAdmin):
    pass
