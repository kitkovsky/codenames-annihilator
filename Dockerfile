FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn global add bun && bun i

CMD bun dev
