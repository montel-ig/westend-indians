# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def create_eventspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    EventsPage = apps.get_model('content.EventsPage')

    # Create content type for eventspage model
    eventspage_content_type, __ = ContentType.objects.get_or_create(
        model='eventspage', app_label='content')

    # Create a new eventspage
    eventspage = EventsPage.objects.create(
        title="Events",
        draft_title="Events",
        slug='events',
        content_type=eventspage_content_type,
        path='000100010002',
        depth=3,
        numchild=0,
        url_path='/events/',
    )


def remove_eventspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    EventsPage = apps.get_model('content.EventsPage')

    # Delete the default eventspage
    # Page and Site objects CASCADE
    EventsPage.objects.filter(slug='events', depth=3).delete()

    # Delete content type for eventspage model
    ContentType.objects.filter(model='eventspage', app_label='content').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_create_teamspage'),
    ]

    operations = [
        migrations.RunPython(create_eventspage, remove_eventspage),
    ]
