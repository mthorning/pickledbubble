FROM strapi/base

WORKDIR /srv/app

COPY package.json .
COPY package-lock.json .
COPY api api
COPY config config
COPY exports exports
COPY extensions extensions
COPY build build

RUN npm ci
CMD npm start


