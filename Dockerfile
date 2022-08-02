FROM node:alpine as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
