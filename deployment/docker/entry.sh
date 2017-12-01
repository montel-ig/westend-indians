#!/bin/sh

SETTINGS=indians.settings

echo "********************* running migrations"
python manage.py migrate

#echo "********************* collect static"
#python manage.py collectstatic --noinput --settings ${SETTINGS}
#
#echo "********************* compress"
#python manage.py compress --settings ${SETTINGS}

echo "********************* starting supervisord"
supervisord -n -c /etc/supervisor.d/supervisor.ini