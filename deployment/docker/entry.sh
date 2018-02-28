#!/bin/sh

echo "*** Running migrations ***"
python manage.py migrate

echo "*** Starting the circus ***"
circusd /app/deployment/docker/circus.ini