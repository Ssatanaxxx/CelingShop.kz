# ===== BACKEND =====
FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
RUN npm run build # Транспиляция TS

# ===== FRONTEND =====
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ===== FINAL =====
FROM node:20-alpine
WORKDIR /app

# backend
COPY --from=backend /app/backend/dist ./backend/dist
COPY --from=backend /app/backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# frontend dist
COPY --from=frontend /app/frontend/dist ./frontend/dist

# server
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
