FROM node:16

WORKDIR /app

COPY . .

RUN npm i

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "run", "start"]