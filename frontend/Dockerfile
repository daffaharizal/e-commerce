# pull official base image
FROM node:lts-alpine

# Set the working directory
ENV BASE_DIR=/home/app
ENV APP_HOME=$BASE_DIR/frontend
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ARG NODE_ENV

# add `/app/node_modules/.bin` to $PATH
ENV PATH $BASE_DIR/node_modules/.bin:$PATH

# install yarn
RUN apk add yarn

# install app dependencies
COPY package.json $BASE_DIR/

RUN if [ "$NODE_ENV" = "development" ]; \
  then yarn install --loglevel verbose; \
  else yarn install --only=production; \
  fi

RUN yarn cache clean

# Copies everything over to $APP_HOME
COPY . $APP_HOME

# Finally runs the application
CMD ["yarn", "start"]
