FROM node:16.14-alpine

WORKDIR /usr/src/skillsly_notification_handler_ms
COPY package*.json ./

ENV NODE_ENV=production

RUN npm install glob rimraf
RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

ENV ENABLE_LOG=true

RUN npm run build

CMD ["node", "dist/main"]
