#!/bin/bash -xe

NAME="bt_analysis"
IMAGE="$NAME:$(git rev-parse --short HEAD)"
SERVER=abe@localbitcoins-abe

docker build -t $IMAGE .

docker save $IMAGE | bzip2 | pv | ssh $SERVER 'bunzip2 | docker load'

ssh $SERVER "docker tag $IMAGE $NAME:latest"
ssh $SERVER "~/.local/bin/docker-compose up -d"
