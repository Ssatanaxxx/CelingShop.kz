FROM node:18-alpine

WORKDIR /app

# 1. Копируем package.json
COPY package*.json ./

# 2. Устанавливаем ВСЕ зависимости
RUN npm ci

# 3. Копируем исходный код
COPY . .

# 4. Компилируем TypeScript
RUN npm run build

# 5. Удаляем devDependencies для уменьшения размера
RUN npm prune --production

EXPOSE 3000

# ИСПРАВЛЕНО: server.js вместо index.js
CMD ["node", "dist/server.js"]
