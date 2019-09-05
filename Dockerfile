FROM python:3.6
MAINTAINER oskari@montel.fi

ENV PYTHONUNBUFFERED 1
ENV WORK_DIR /app
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}
EXPOSE 80

# install nginx, circus, chausetta, a more recent nodejs and build deps
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y --no-install-recommends nginx vim-tiny nodejs libpq-dev build-essential libjpeg-dev && \
    pip install "tornado<5" circus chaussette && \
    rm -rf /var/lib/apt/lists/*

# install our app requirements
ADD requirements.txt ${work_dir}
RUN pip install -r requirements.txt && \
    rm -rf ~/.cache/pip /tmp/pip-build-root

ADD package.json ${work_dir}
RUN npm install && \
    npm cache verify

# clean up a bit
RUN apt-get -y purge libpq-dev build-essential libjpeg-dev && \
    apt-get -y autoremove && \
    apt-get -y clean

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

COPY deployment/docker/nginx.conf /etc/nginx/nginx.conf

ENV DJANGO_SETTINGS indians.settings.compress

ADD . ${WORK_DIR}

RUN python manage.py collectstatic --settings=${DJANGO_SETTINGS} --noinput
RUN DEBUG=no python manage.py compress --settings=${DJANGO_SETTINGS}

CMD ["/app/deployment/docker/entry.sh"]
