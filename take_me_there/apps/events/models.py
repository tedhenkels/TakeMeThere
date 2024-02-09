from datetime import datetime
from django.db import models
from take_me_there.apps.venues.models import Venue


class Event(models.Model):
    artist_name = models.CharField(max_length=64)
    created = models.DateField()
    modified = models.DateField()
    date = models.DateField(null=True, blank=True)
    venue = models.ForeignKey(Venue, related_name="events", on_delete=models.CASCADE)
    url = models.URLField(null=True, blank=True)

    class Meta:
        ordering = ['date', 'pk']

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = datetime.now()
        self.modified = datetime.now()

        super(Event, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.artist_name} at {self.venue.name}"
