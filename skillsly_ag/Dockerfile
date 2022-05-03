FROM node:16.14-alpine

WORKDIR /usr/src/skillsly_ag
COPY package*.json ./

ENV NODE_ENV=production

RUN npm install glob rimraf
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8010
CMD ["node", "dist/main"]
