from django.db import models
from datetime import datetime


# Create your models here.
class Venue(models.Model):
    created = models.DateField()
    modified = models.DateField()
    name = models.CharField(max_length=64)
    address = models.CharField(max_length=256)
    url = models.URLField()

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = datetime.now()
        self.modified = datetime.now()

        super(Venue, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
