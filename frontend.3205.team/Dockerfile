# Используем Node.js как базовый образ
FROM node:20.18.0-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app


COPY package*.json ./


RUN yarn install


COPY . .


RUN yarn build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html


EXPOSE 3000



CMD ["yarn", "start"]

