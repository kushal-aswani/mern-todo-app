FROM node:24.6-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

FROM alpine:latest

RUN apk add --no-cache nodejs-lts tini

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./

ENTRYPOINT ["tini","--"]

CMD ["node","dist/app.js"]