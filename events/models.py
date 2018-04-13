from django.db import models
from ckeditor.fields import RichTextField
from django.utils import timezone
from django.utils.text import slugify
from imagekit.models import ImageSpecField
from pilkit.processors import ResizeToFit


class Event(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, editable=False, null=True)
    ingress = models.TextField(blank=True, null=True)
    description = RichTextField()

    image = models.ImageField(null=True, blank=True)
    image_wide = ImageSpecField(source='image',
                                processors=[ResizeToFit(width=1280, height=800, upscale=True)],
                                options={'quality': 80},
                                autoconvert=True)
    image_medium = ImageSpecField(source='image',
                                  processors=[ResizeToFit(width=750, height=800, upscale=True)],
                                  options={'quality': 80},
                                  autoconvert=True)


    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(blank=True, null=True)

    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=19, decimal_places=16, null=True, default=None, blank=True)
    lng = models.DecimalField(max_digits=19, decimal_places=16, null=True, default=None, blank=True)

    publication_date = models.DateTimeField(default=timezone.now, blank=True)
    visible = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if (not self.slug) or (slugify(self.name) not in self.slug):
            self.slug = self.__get_unique_slug()
        super().save()

    def __str__(self):
        return f"{self.name}"

    def __get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        num = 1
        while Event.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug
