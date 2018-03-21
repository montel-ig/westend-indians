from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtailsearch import urls as wagtailsearch_urls

from teams.views import team
import news.views
import events.views

urlpatterns = [
      url(r'tapahtumat/(?P<slug>[\w-]+)', events.views.event, name='event'),
      url(r'uutiset/(?P<slug>[\w-]+)', news.views.news_item, name='news_item'),
      url(r'uutiset/', news.views.index),

      url(r'^admin/', admin.site.urls),
      url(r'^cms/', include(wagtailadmin_urls)),
      url(r'^search/', include(wagtailsearch_urls)),
      url(r'^documents/', include(wagtaildocs_urls)),
      url(r'joukkueet/(?P<slug>[\w-]+)', team.by_slug),
      url(r'^api/v1/teams.json', team.teams_json),
      url(r'', include(wagtail_urls)),

  ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
