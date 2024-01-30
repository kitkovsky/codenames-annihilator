FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn global add pnpm && pnpm i

CMD pnpm dev
