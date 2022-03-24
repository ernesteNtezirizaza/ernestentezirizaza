FROM node:16.14.0-alpine

WORKDIR /usr/app

COPY ./package.json .

RUN npm install 

COPY . .

EXPOSE 6000

CMD [ "npm", "start" ]