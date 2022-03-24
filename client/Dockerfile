FROM node:16.14.0-alpine as builder

WORKDIR /usr/app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app /usr/share/nginx/html

CMD [ "npm", "run", "serve" ]