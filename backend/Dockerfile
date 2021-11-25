FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm i --loglevel=warn && npm cache clean --force; \
    else npm i --only=production; \
    fi

COPY . ./

CMD ["npm", "start"]
