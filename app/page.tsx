'use client';

import { useState, useEffect } from 'react';
import DigitalsCarousel from './components/DigitalsCarousel';

export default function Home() {
  // Добавляем определение мобильного устройства для страницы
  const [isMobile, setIsMobile] = useState(false);
  
  // Проверка размера экрана для определения мобильной версии
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Вызываем при монтировании
    checkIsMobile();
    
    // Добавляем слушателя изменения размера окна
    window.addEventListener('resize', checkIsMobile);
    
    // Удаляем слушателя при размонтировании
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Версия изображений - меняйте её при обновлении изображений
  // Можно использовать дату сборки, хэш или любое другое значение
  const IMAGE_VERSION = '20250316v1';
  
  // Функция для добавления версии к пути изображения
  const getImagePath = (path: string) => {
    return `${path}?v=${IMAGE_VERSION}`;
  };

  // Массив с изображениями для карусели, отсортированный в числовом порядке
  const digitalImages = [
    {
      id: 1,
      src: getImagePath('/images/IMG_01.JPG'),
      alt: 'Sagadeeva Alina - digital photo 1',
    },
    {
      id: 2,
      src: getImagePath('/images/IMG_02.JPG'),
      alt: 'Sagadeeva Alina - digital photo 2',
    },
    {
      id: 3,
      src: getImagePath('/images/IMG_03.JPG'),
      alt: 'Sagadeeva Alina - digital photo 3',
    },
    {
      id: 4,
      src: getImagePath('/images/IMG_04.JPG'),
      alt: 'Sagadeeva Alina - digital photo 4',
    },
    {
      id: 5,
      src: getImagePath('/images/IMG_05.JPG'),
      alt: 'Sagadeeva Alina - digital photo 5',
    },
    {
      id: 6,
      src: getImagePath('/images/IMG_06.JPG'),
      alt: 'Sagadeeva Alina - digital photo 6',
    },
    {
      id: 7,
      src: getImagePath('/images/IMG_07.JPG'),
      alt: 'Sagadeeva Alina - digital photo 7',
    },
    {
      id: 8,
      src: getImagePath('/images/IMG_08.JPG'),
      alt: 'Sagadeeva Alina - digital photo 8',
    },
    {
      id: 9,
      src: getImagePath('/images/IMG_09.JPG'),
      alt: 'Sagadeeva Alina - digital photo 9',
    },
    {
      id: 10,
      src: getImagePath('/images/IMG_10.JPG'),
      alt: 'Sagadeeva Alina - digital photo 10',
    },
    {
      id: 11,
      src: getImagePath('/images/IMG_11.JPG'),
      alt: 'Sagadeeva Alina - digital photo 11',
    }
  ];

  return (
    <div className={`${isMobile ? 'flex flex-col w-full overflow-x-hidden' : ''} h-screen`}>
      <DigitalsCarousel images={digitalImages} />
    </div>
  );
} 