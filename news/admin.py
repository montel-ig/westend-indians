from django.contrib import admin

from news.models import *


class NewsItemAdmin(admin.ModelAdmin):
    model = NewsItem


admin.site.register(NewsItem, NewsItemAdmin)