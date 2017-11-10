# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def create_teamspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    TeamsPage = apps.get_model('content.TeamsPage')

    # Create content type for teamspage model
    teamspage_content_type, __ = ContentType.objects.get_or_create(
        model='teamspage', app_label='content')

    # Create a new teamspage
    teamspage = TeamsPage.objects.create(
        title="Teams",
        draft_title="Teams",
        slug='teams',
        content_type=teamspage_content_type,
        path='000100010001',
        depth=3,
        numchild=0,
        url_path='/teams/',
    )


def remove_teamspage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    TeamsPage = apps.get_model('content.TeamsPage')

    # Delete the default teamspage
    # Page and Site objects CASCADE
    TeamsPage.objects.filter(slug='teams', depth=3).delete()

    # Delete content type for teamspage model
    ContentType.objects.filter(model='teamspage', app_label='content').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_create_homepage'),
    ]

    operations = [
        migrations.RunPython(create_teamspage, remove_teamspage),
    ]
