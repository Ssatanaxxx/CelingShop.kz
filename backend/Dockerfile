# ========== БЭКЕНД ==========
FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

# ========== ФРОНТЕНД ==========
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ========== ФИНАЛЬНЫЙ ОБРАЗ ==========
FROM node:20-alpine
WORKDIR /app

# Копируем собранный бэкенд
COPY --from=backend /app/backend/dist ./backend-dist
COPY --from=backend /app/backend/package.json ./
COPY --from=backend /app/backend/node_modules ./node_modules

# Копируем собранный фронтенд
COPY --from=frontend /app/frontend/dist ./frontend-dist

# Копируем файлы сервера для раздачи статики
COPY server.js ./
COPY package.json ./

EXPOSE 3000
CMD ["node", "server.js"]