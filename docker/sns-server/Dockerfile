FROM node:latest
RUN apt-get update -qq && \
    apt-get install -y git default-mysql-client

COPY ./server/package*.json ./

RUN npm install

COPY ./server/ .

CMD [ "npm", "start" ]