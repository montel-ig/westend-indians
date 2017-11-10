from django.db import models


class NewsItem(models.Model):
    title = models.CharField(max_length=255)
    ingress = models.TextField()
    body = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
