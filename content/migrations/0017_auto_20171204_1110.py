# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-04 11:10
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0016_auto_20171130_0759'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tribepage',
            name='description',
        ),
        migrations.AddField(
            model_name='tribepage',
            name='body',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='tribepage',
            name='main_lift',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='tribepage',
            name='partners',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
    ]
