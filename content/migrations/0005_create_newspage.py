# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def create_newspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    NewsPage = apps.get_model('content.NewsPage')

    # Create content type for newspage model
    newspage_content_type, __ = ContentType.objects.get_or_create(
        model='newspage', app_label='content')

    # Create a new newspage
    newspage = NewsPage.objects.create(
        title="News",
        draft_title="News",
        slug='news',
        content_type=newspage_content_type,
        path='000100010003',
        depth=3,
        numchild=0,
        url_path='/news/',
    )



def remove_newspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    NewsPage = apps.get_model('content.NewsPage')

    # Delete the default newspage
    # Page and Site objects CASCADE
    NewsPage.objects.filter(slug='news', depth=3).delete()

    # Delete content type for newspage model
    ContentType.objects.filter(model='newspage', app_label='content').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_create_eventspage'),
    ]

    operations = [
        migrations.RunPython(create_newspage, remove_newspage),
    ]
