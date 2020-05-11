FROM golang:alpine as builder
USER root
WORKDIR /app

#COPY ./build ./build

COPY ./client ./client 
COPY ./server ./server
RUN apk add --update --no-cache nodejs yarn

RUN mkdir build
RUN cd client; yarn install; yarn build
RUN mv ./client/build ./build/build
RUN cd ./server; go mod download; go build main.go; mv main ../build
RUN mv ./server/config.yml ./build/config.yml

FROM alpine:latest
USER root
LABEL maintainer="Gali-Ketema Mbogo <ketema.galy@gmail.com>"
COPY --from=builder /app/build /app/build

EXPOSE 80

WORKDIR /app/build

ENTRYPOINT [ "./main" ]

