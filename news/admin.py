from django.contrib import admin

from news.models import *


class NewsItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'publication_date', 'created_at', 'updated_at')
    search_fields = ['title']


admin.site.register(NewsItem, NewsItemAdmin)