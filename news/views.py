from django.contrib import messages
from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.datetime_safe import datetime
from wagtail.wagtailcore.models import Page

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
    return render(request, 'news/index.html', locals())


def news_item(request, slug):
    try:
        news_item = NewsItem.objects.get(slug=slug, publication_date__lt=datetime.now(), visible=True)
    except NewsItem.DoesNotExist:
        messages.error(request, "Uutista ei löytynyt")
        return redirect(reverse('news_index'))
    page_for_lifts = Page.objects.get(title="Westend Indians").homepage
    sponsors = Sponsor.objects.filter(visible_for_frontpage=True)
    return render(request, 'news/news_item.html', locals())