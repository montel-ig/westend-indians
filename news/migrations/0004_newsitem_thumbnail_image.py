# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-12 06:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0003_newsitem_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsitem',
            name='thumbnail_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]