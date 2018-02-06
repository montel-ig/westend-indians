from .base import *

import sys

SECRET_KEY = os.environ.get('SECRET_KEY')

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