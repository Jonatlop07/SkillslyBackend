FROM node:16.14-alpine

WORKDIR /usr/src/skillsly_auth_ms
COPY package*.json ./

ENV NODE_ENV=production

RUN npm install glob rimraf
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
