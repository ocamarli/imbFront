FROM node:16

WORKDIR /app


COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./public ./public
COPY ./src ./src

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]