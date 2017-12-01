#!/bin/sh

echo "********************* running migrations"
python manage.py migrate

echo "********************* collect static"
python manage.py collectstatic --noinput --settings indians.settings

echo "********************* starting supervisord"
supervisord -n -c /etc/supervisor.d/supervisor.ini