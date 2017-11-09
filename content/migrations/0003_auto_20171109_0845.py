# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-09 08:45
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_pageroot'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pageroot',
            name='description',
        ),
        migrations.AddField(
            model_name='pageroot',
            name='body',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
    ]
