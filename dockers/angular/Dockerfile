FROM node:10.1.0-alpine

RUN apk upgrade
RUN apk update

RUN npm install --unsafe-perm -g @angular/cli@6.2.6

WORKDIR /src

EXPOSE 4200
