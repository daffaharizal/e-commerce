# Pull official base image
FROM node:lts-alpine

# Set the working directory
ENV APP_HOME=/home/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ARG NODE_ENV

# Add `/home/app/node_modules/.bin` to $PATH
ENV PATH $APP_HOME/node_modules/.bin:$PATH

COPY package.json $APP_HOME/

RUN if [ "$NODE_ENV" = "development" ]; \
  then yarn install --loglevel warn && yarn cache clean --force; \
  else yarn install --only=production; \
  fi

# Copies everything over to $APP_HOME
COPY . $APP_HOME

# Finally runs the application
CMD ["yarn", "start"]
