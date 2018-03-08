from django.shortcuts import render

from news.models import NewsItem
from sponsors.models import Sponsor


def index(request):
    news = NewsItem.objects.all().order_by('-publication_date')
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'index.html', locals())


def news_item(request, slug):
    news_item = NewsItem.objects.get(slug=slug)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'news_item.html', locals())