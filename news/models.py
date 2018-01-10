from django.db import models
from ckeditor.fields import RichTextField


class NewsItem(models.Model):
    title = models.CharField(max_length=255)
    ingress = models.TextField()
    body = RichTextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"