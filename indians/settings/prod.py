from .base import *

import sys

COMPRESS_ENABLED = True
DEBUG = False

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'basic': {
            'format': '%(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'level': 'INFO',  # DEBUG
            'class': 'logging.StreamHandler',
            'stream': sys.stdout,
            'formatter': 'basic'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',  # DEBUG
            'propagate': True,
        },
    },
}

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

GOOGLE_ANALYTICS = "UA-94082641-1"
