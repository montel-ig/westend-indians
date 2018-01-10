from django.db import models
from ckeditor.fields import RichTextField


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = RichTextField()

    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(blank=True, null=True)

    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=19, decimal_places=16, null=True, default=None, blank=True)
    lng = models.DecimalField(max_digits=19, decimal_places=16, null=True, default=None, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
