FROM node:10.1.0-alpine

RUN apk upgrade
RUN apk update

RUN npm install --unsafe-perm -g @angular/cli@7.3.8
RUN npm install -g npm-check-updates

WORKDIR /src

EXPOSE 4200
