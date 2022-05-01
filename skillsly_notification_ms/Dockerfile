FROM node:16.14-alpine

WORKDIR /usr/src/skillsly_notification_ms
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install

COPY . .

ENV API_HOST=0.0.0.0
ENV API_PORT=3000
ENV API_ENABLE_LOG=true

RUN npm run build

EXPOSE 8011
CMD ["node", "dist/main"]
