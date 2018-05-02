from django.core.paginator import Paginator
from django.shortcuts import render
from django.utils.datetime_safe import datetime

from news.models import NewsItem
from news.utils import _serialize_news
from sponsors.models import Sponsor


def index(request):
    highlighted = 3
    news = NewsItem.objects.filter(publication_date__lt=datetime.now(), visible=True).order_by('-publication_date')
    news_for_carousel_json = _serialize_news(news[0:highlighted])
    page = request.GET.get('page', 1)
    if page == 0:
        page = 1
    rest_of_news = news[highlighted:]
    paginator = Paginator(rest_of_news, 5)
    rest_of_news = paginator.page(page)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'index.html', locals())


def news_item(request, slug):
    news_item = NewsItem.objects.get(slug=slug, publication_date__lt=datetime.now(), visible=True)
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'news_item.html', locals())