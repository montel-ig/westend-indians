from django.contrib import admin

from products.models import *


class ProductImagesInline(admin.StackedInline):
    model = ProductImage
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'get_categories')
    model = Product
    inlines = (ProductImagesInline,)

    def get_categories(self, obj):
        return ', '.join(map(lambda x: x.name, obj.categories.all()))
    get_categories.short_description = 'categories'


class ProductCategoryAdmin(admin.ModelAdmin):
    model = ProductCategory


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)