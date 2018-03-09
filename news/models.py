from django.db import models
from ckeditor.fields import RichTextField

from django.utils import timezone
from django.utils.text import slugify

SUBJECT_TYPES = (
    ('heimo', 'Heimo'),
    ('miehet-edustus', 'Miehet-edustus'),
)


class NewsItem(models.Model):
    subject = models.CharField(choices=SUBJECT_TYPES, null=True, max_length=20, default=SUBJECT_TYPES[0][0])
    slug = models.SlugField(max_length=255, blank=True, editable=False, null=True)

    title = models.CharField(max_length=255)
    ingress = models.TextField()
    body = RichTextField()
    thumbnail_image = models.ImageField(null=True)
    publication_date = models.DateTimeField(default=timezone.now, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if (not self.slug) or (slugify(self.title) not in self.slug):
            self.slug = self.__get_unique_slug()
        super().save()

    @property
    def image_url(self):
        if self.thumbnail_image and hasattr(self.thumbnail_image, 'url'):
            return self.thumbnail_image.url

    def __str__(self):
        return f"{self.title}"

    def __get_unique_slug(self):
        slug = slugify(self.title)
        unique_slug = slug
        num = 1
        while NewsItem.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug