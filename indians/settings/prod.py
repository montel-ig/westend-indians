from .base import *

import sys

SECRET_KEY = os.environ.get('SECRET_KEY')

COMPRESS_ENABLED = True

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
        'LOCATION': '127.0.0.1:6379',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}