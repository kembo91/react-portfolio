FROM alpine:latest
USER root
LABEL maintainer="Gali-Ketema Mbogo <ketema.galy@gmail.com>"
WORKDIR /app

COPY ./client ./client 
COPY ./server ./server

RUN apk add --update --no-cache nodejs yarn go bash

ENV GOROOT=/usr/lib/go
RUN mkdir /home/go
ENV GOPATH=/home/go
ENV PATH=${PATH}:${GOROOT}/bin

RUN mkdir build
RUN cd client; yarn install; yarn build
RUN mv ./client/build ./build/build
RUN cd ./server; go mod download; go build main.go; mv main ../build
RUN mv ./server/config.yml ./build/config.yml

EXPOSE 8080

WORKDIR /app/build

CMD ["./main"]

