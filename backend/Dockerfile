FROM node:latest

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm i && npm cache clean --force; \
    else npm i --only=production; \
    fi

COPY . ./

CMD ["npm", "start"]
