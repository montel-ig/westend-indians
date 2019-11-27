from .prod import *

# FIXME: Remove ingres temporary domain
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'staging.westendindians.fi', 'westendindians.fi',
                 'westend-indians-ingress.westend-indians-stage.95.216.142.241.xip.io']

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/2',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

GOOGLE_ANALYTICS = None