FROM mhart/alpine-node

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
COPY __sapper__ __sapper__
COPY static static

RUN npm ci
CMD npm start


