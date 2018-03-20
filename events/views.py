from django.shortcuts import render

from events.models import Event
from sponsors.models import Sponsor

# indexing happens on a content page

def event(request, slug):
    event = Event.objects.get(slug=slug)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'event.html', locals())