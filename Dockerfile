FROM node:lts-alpine

WORKDIR /skillsly_comments_ms
COPY . .

RUN npm install --only=production

USER node

CMD ["npm", "start"]

EXPOSE 8000