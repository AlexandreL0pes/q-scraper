FROM node:14.4-alpine

ENV NODE_ENV=development
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 4000

RUN mkdir /front
WORKDIR /front

COPY package*.json ./
RUN yarn install 

COPY . .
EXPOSE 4000