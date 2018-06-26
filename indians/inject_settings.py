from django.conf import settings


def inject(_request):
    return {'settings': {'GOOGLE_ANALYTICS': settings.GOOGLE_ANALYTICS}}
