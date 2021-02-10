FROM node:15.8-alpine3.12

WORKDIR /app

# Necessary to work with `jest --watch`
RUN apk update && apk upgrade && apk add git

COPY package.json package.json
COPY yarn.lock yarn.lock

# running app in development environment
ENV NODE_ENV development

RUN yarn install

CMD ["yarn", "run", "dev"]
