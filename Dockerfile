FROM python:3.6-alpine
MAINTAINER lauri@montel.fi

ENV PYTHONUNBUFFERED 1
ENV work_dir /app
RUN mkdir -p ${work_dir}
WORKDIR ${work_dir}

ADD requirements.txt ${work_dir}
ADD package.json ${work_dir}


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

ADD . ${work_dir}
RUN python manage.py collectstatic --noinput
RUN DEBUG=no python manage.py compress

CMD ["/app/deployment/docker/entry.sh"]