# Этап сборки
FROM node:18-alpine AS builder
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci

# Копируем исходники
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Этап запуска
FROM nginx:alpine

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из этапа сборки
COPY --from=builder /app/out /usr/share/nginx/html

# Явно копируем папку с изображениями в правильное место
COPY --from=builder /app/public/images /usr/share/nginx/html/images

# Устанавливаем правильные права на изображения
RUN chmod -R 644 /usr/share/nginx/html/images && \
    find /usr/share/nginx/html/images -type d -exec chmod 755 {} \;

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"] 