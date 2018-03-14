from django.contrib import admin

from news.models import *


class NewsItemAdmin(admin.ModelAdmin):
    model = NewsItem
    list_display = ('title', 'publication_date', 'created_at', 'updated_at')


admin.site.register(NewsItem, NewsItemAdmin)