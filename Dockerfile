FROM alpine:3.5

WORKDIR /srv

COPY package.json ./
COPY yarn.lock ./

RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main' > /etc/apk/repositories \
 && echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
 && echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories \
 && export NODE_ENV=production \
 && apk update \
 && apk add --no-cache yarn \
 && yarn \
 && yarn cache clean

COPY public/dist/ public/dist/
COPY public/manifest.json public
COPY public/sw.js public
COPY public/caches.js public
COPY caches.json ./
COPY server server

RUN sed -E "s/127\.0\.0\.1/0.0.0.0/g" -i ./server/index.js

EXPOSE 8000

CMD ["node", "server/index.js"]
