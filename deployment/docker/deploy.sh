#!/bin/bash -xe

NAME="indians_site"
IMAGE="$NAME:$(git rev-parse --short HEAD)"
SERVER=chief@80.69.173.67

docker build -t $IMAGE .

docker save $IMAGE | bzip2 | pv | ssh $SERVER 'bunzip2 | docker load'

ssh $SERVER "docker tag $IMAGE $NAME:latest"
ssh $SERVER "docker-compose up -d"
