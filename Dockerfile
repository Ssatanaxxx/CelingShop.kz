# Корневой Dockerfile для Render
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:alpine
# Копируем собранный фронтенд
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html
# Копируем nginx конфиг с прокси
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
# Копируем бэкенд
COPY --from=backend /app/backend /usr/share/nginx/backend
# Создаем entrypoint скрипт
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'cd /usr/share/nginx/backend && node dist/server.js &' >> /entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]