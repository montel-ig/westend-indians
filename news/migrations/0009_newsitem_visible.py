# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-03-20 19:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0008_auto_20180309_0925'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsitem',
            name='visible',
            field=models.BooleanField(default=True),
        ),
    ]