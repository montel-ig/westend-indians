from django.shortcuts import render
from django.utils.datetime_safe import datetime

from news.models import NewsItem
from news.utils import _serialize_news
from sponsors.models import Sponsor


def index(request):
    news = NewsItem.objects.filter(publication_date__lt=datetime.now(), visible=True).order_by('-publication_date')
    news_for_carousel_json = _serialize_news(news[0:3])
    rest_of_news = news[3:]
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'index.html', locals())


def news_item(request, slug):
    news_item = NewsItem.objects.get(slug=slug, publication_date__lt=datetime.now(), visible=True)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'news_item.html', locals())