FROM node:16.14-alpine

WORKDIR /usr/src/skillsly_user_ms
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install

COPY . .

ENV ENABLE_LOG=true

RUN npm run build

CMD ["node", "dist/main"]
