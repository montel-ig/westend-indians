import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
env_debug = os.environ.get('DEBUG')
if env_debug and env_debug in ('False', 'false', '0', 'no'):
    DEBUG = False
else:
    DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'stg.westendindians.fi', 'westendindians.fi', 'www.westendindians.fi']


# Application definition

INSTALLED_APPS = [
    'indians',
    'teams',
    'events',
    'news',
    'content',
    'products',
    'sponsors',
    'signups',
    'stats',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "django.contrib.sitemaps",

    'wagtail.wagtailforms',
    'wagtail.wagtailredirects',
    'wagtail.wagtailembeds',
    'wagtail.wagtailsites',
    'wagtail.wagtailusers',
    'wagtail.wagtailsnippets',
    'wagtail.wagtaildocs',
    'wagtail.wagtailimages',
    'wagtail.wagtailsearch',
    'wagtail.wagtailadmin',
    'wagtail.wagtailcore',

    'compressor',
    'compressor_toolkit',
    'modelcluster',
    'taggit',
    'colorful',
    'imagekit',
    'ckeditor',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'indians.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'indians.inject_settings.inject',
            ],
        },
    },
]

WSGI_APPLICATION = 'indians.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME':     os.environ.get('DB') or 'indians',
        'USER':     os.environ.get('DBUSER') or 'indians',
        'PASSWORD': os.environ.get('DBPASS') or 'indians',
        'HOST':     os.environ.get('DBHOST') or '127.0.0.1',
        'PORT':     os.environ.get('DBPORT') or '5411',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'fi'
# LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Helsinki'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Taken from the default but switched first ones from US to FI
# DATE_INPUT_FORMATS = [
#     '%d-%m-%Y', '%d/%m/%Y', '%d/%m/%y',  # '2006-10-25', '10/25/2006', '10/25/06'
#     '%b %d %Y', '%b %d, %Y',             # 'Oct 25 2006', 'Oct 25, 2006'
#     '%d %b %Y', '%d %b, %Y',             # '25 Oct 2006', '25 Oct, 2006'
#     '%B %d %Y', '%B %d, %Y',             # 'October 25 2006', 'October 25, 2006'
#     '%d %B %Y', '%d %B, %Y',             # '25 October 2006', '25 October, 2006'
# ]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

WAGTAIL_SITE_NAME = 'Westend Indians'
WAGTAILSEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'wagtail.wagtailsearch.backends.db',
    }
}

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder'
)

COMPRESS_PRECOMPILERS = (
    ('text/x-scss', 'compressor_toolkit.precompilers.SCSSCompiler'),
    ('module', 'compressor_toolkit.precompilers.ES6Compiler'),
    ('text/jsx', 'node_modules/.bin/babel {infile} > {outfile}'),
)
COMPRESS_OFFLINE = True
COMPRESS_OFFLINE_CONTEXT = {}

GOOGLE_ANALYTICS = None