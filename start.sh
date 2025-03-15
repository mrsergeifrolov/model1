#!/bin/bash

# Проверка наличия Docker
if ! command -v docker &> /dev/null; then
    echo "Docker не установлен. Пожалуйста, установите Docker и попробуйте снова."
    exit 1
fi

# Сборка Docker-образа
echo "Сборка Docker-образа..."
docker build -t model-portfolio .

# Запуск контейнера
echo "Запуск контейнера..."
docker run -p 3000:3000 model-portfolio

echo "Сайт доступен по адресу: http://localhost:3000" 