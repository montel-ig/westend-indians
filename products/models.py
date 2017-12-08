from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    description = models.TextField()
    price = models.DecimalField(max_digits=9, decimal_places=2)
    image = models.ImageField(blank=True, null=True)
    visible = models.BooleanField(default=False)

    categories = models.ManyToManyField('ProductCategory', related_name='products')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        num = 1
        while Product.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if (not self.slug) or (slugify(self.name) not in self.slug):
            self.slug = self.__get_unique_slug()
        super().save()

    def __str__(self):
        return f"{self.name}"


class ProductCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)

    def __get_unique_slug(self):
        slug = slugify(self.name)
        unique_slug = slug
        num = 1
        while ProductCategory.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if (not self.slug) or (slugify(self.name) not in self.slug):
            self.slug = self.__get_unique_slug()
        super().save()

    def __str__(self):
        return f"{self.name}"


    class Meta:
        verbose_name_plural = 'Product categories'
