# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-22 11:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_auto_20180117_0737'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsitem',
            name='subject',
            field=models.CharField(choices=[('heimo', 'Heimo'), ('miehet-edustus', 'Miehet-edustus')], default='heimo', max_length=20, null=True),
        ),
    ]