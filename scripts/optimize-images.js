const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../public/images');
const targetDir = path.join(__dirname, '../public/images/optimized');

// Создаем директорию для оптимизированных изображений, если она не существует
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Опции оптимизации
const options = {
  quality: 80,        // Качество JPEG (0-100)
  width: 1800,        // Максимальная ширина
  height: 2400,       // Максимальная высота
  fit: 'inside',      // Сохраняет пропорции
  withoutEnlargement: true, // Не увеличивает изображения меньшего размера
};

// Функция оптимизации изображения
async function optimizeImage(filename) {
  const sourcePath = path.join(sourceDir, filename);
  const targetPath = path.join(targetDir, filename);
  
  try {
    await sharp(sourcePath)
      .resize(options.width, options.height, {
        fit: options.fit,
        withoutEnlargement: options.withoutEnlargement,
      })
      .jpeg({ quality: options.quality })
      .toFile(targetPath);
    
    const sourceStats = fs.statSync(sourcePath);
    const targetStats = fs.statSync(targetPath);
    const savings = ((sourceStats.size - targetStats.size) / sourceStats.size * 100).toFixed(1);
    
    console.log(`Оптимизировано: ${filename} - Сохранено ${savings}% (${(sourceStats.size/1024/1024).toFixed(2)} MB → ${(targetStats.size/1024/1024).toFixed(2)} MB)`);
  } catch (error) {
    console.error(`Ошибка при оптимизации ${filename}:`, error);
  }
}

// Обрабатываем все JPG файлы в директории
async function processDirectory() {
  const files = fs.readdirSync(sourceDir)
    .filter(file => file.toLowerCase().endsWith('.jpg'));
  
  console.log(`Найдено ${files.length} изображений для оптимизации...`);
  
  for (const file of files) {
    await optimizeImage(file);
  }
  
  console.log('Оптимизация изображений завершена.');
}

processDirectory().catch(console.error); 