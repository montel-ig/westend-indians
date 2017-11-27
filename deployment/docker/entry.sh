#!/bin/sh

echo "running migrations"
python manage.py migrate

python manage.py collectstatic --noinput --settings indians.settings.prod

echo "starting supervisord"
supervisord -n -c /etc/supervisor.d/supervisor.ini