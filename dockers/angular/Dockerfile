FROM node:10.9.0-alpine

RUN apk upgrade
RUN apk update

RUN npm install -g npm@6.9.0
RUN npm install --unsafe-perm -g @angular/cli@8.1.2
RUN npm install -g npm-check-updates

WORKDIR /src

EXPOSE 4200
