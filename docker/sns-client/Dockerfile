FROM node:latest
RUN apt-get update -qq && \
    apt-get install -y git

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client/ .

CMD [ "npm", "start" ]