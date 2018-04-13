from django.shortcuts import render
from django.utils.datetime_safe import datetime
from wagtail.wagtailcore.models import Page

from events.models import Event
from sponsors.models import Sponsor

# indexing happens on a content page

def event(request, slug):
    now = datetime.now()
    event = Event.objects.get(slug=slug, visible=True, publication_date__lte=now)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    appear_as_page = Page.objects.get(slug='tapahtumat')
    return render(request, 'event.html', locals())