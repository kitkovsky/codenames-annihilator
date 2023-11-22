FROM node:20-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules \
    && yarn global add pnpm && pnpm i

CMD pnpm dev
