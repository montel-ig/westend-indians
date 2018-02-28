FROM python:3.6-alpine
MAINTAINER lauri@montel.fi

ENV PYTHONUNBUFFERED 1
ENV WORK_DIR /app
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

ADD requirements.txt ${WORK_DIR}
ADD package.json ${WORK_DIR}
RUN apk --update add nginx supervisor postgresql-dev build-base nodejs jpeg-dev zlib-dev linux-headers && \
    npm install && \
    pip install uwsgi && \
    pip install -r requirements.txt && \
    apk del build-base linux-headers && \
    rm -rf /var/cache/apk/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

COPY deployment/docker/nginx-global.conf /etc/nginx/nginx.conf
COPY deployment/docker/nginx-app.conf /etc/nginx/conf.d/default.conf
COPY deployment/docker/supervisor.ini /etc/supervisor.d/

EXPOSE 80

ENV DJANGO_SETTINGS indians.settings.prod

ADD . ${WORK_DIR}
RUN python manage.py collectstatic --settings=${DJANGO_SETTINGS} --noinput
RUN DEBUG=no python manage.py compress --settings=${DJANGO_SETTINGS}

CMD ["/app/deployment/docker/entry.sh"]
