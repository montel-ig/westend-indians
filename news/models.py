from django.db import models
from ckeditor.fields import RichTextField

SUBJECT_TYPES = (
    ('heimo', 'Heimo'),
    ('miehet-edustus', 'Miehet-edustus'),
)


class NewsItem(models.Model):
    subject = models.CharField(choices=SUBJECT_TYPES, null=True, max_length=20, default=SUBJECT_TYPES[0][0])
    title = models.CharField(max_length=255)
    ingress = models.TextField()
    body = RichTextField()
    thumbnail_image = models.ImageField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def image_url(self):
        if self.thumbnail_image and hasattr(self.thumbnail_image, 'url'):
            return self.thumbnail_image.url

    def __str__(self):
        return f"{self.title}"