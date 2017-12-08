# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-30 07:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('content', '0013_auto_20171130_0657'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClubPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('body', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('introduction', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('values', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('contact', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('personnel', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('partners', wagtail.wagtailcore.fields.RichTextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='InfoPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('body', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('tickets', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('information', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('contact', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('partners', wagtail.wagtailcore.fields.RichTextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='RepresentativeTeamPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('body', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('lift_1', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('partners', wagtail.wagtailcore.fields.RichTextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='StatisticsPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('body', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('matches', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('series_status', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('points', wagtail.wagtailcore.fields.RichTextField(blank=True)),
                ('partners', wagtail.wagtailcore.fields.RichTextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
    ]