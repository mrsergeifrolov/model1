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

  // Массив с изображениями для карусели, отсортированный в числовом порядке
  const digitalImages = [
    {
      id: 1,
      src: '/images/IMG_01.JPG',
      alt: 'Sagadeeva Alina - digital photo 1',
    },
    {
      id: 2,
      src: '/images/IMG_02.JPG',
      alt: 'Sagadeeva Alina - digital photo 2',
    },
    {
      id: 3,
      src: '/images/IMG_03.JPG',
      alt: 'Sagadeeva Alina - digital photo 3',
    },
    {
      id: 4,
      src: '/images/IMG_04.JPG',
      alt: 'Sagadeeva Alina - digital photo 4',
    },
    {
      id: 5,
      src: '/images/IMG_05.JPG',
      alt: 'Sagadeeva Alina - digital photo 5',
    },
    {
      id: 6,
      src: '/images/IMG_06.JPG',
      alt: 'Sagadeeva Alina - digital photo 6',
    },
    {
      id: 7,
      src: '/images/IMG_07.JPG',
      alt: 'Sagadeeva Alina - digital photo 7',
    },
    {
      id: 8,
      src: '/images/IMG_08.JPG',
      alt: 'Sagadeeva Alina - digital photo 8',
    },
    {
      id: 9,
      src: '/images/IMG_09.JPG',
      alt: 'Sagadeeva Alina - digital photo 9',
    },
    {
      id: 10,
      src: '/images/IMG_10.JPG',
      alt: 'Sagadeeva Alina - digital photo 10',
    },
    {
      id: 11,
      src: '/images/IMG_11.JPG',
      alt: 'Sagadeeva Alina - digital photo 11',
    }
  ];

  return (
    <div className={`${isMobile ? 'flex flex-col w-full overflow-x-hidden' : ''} h-screen`}>
      <DigitalsCarousel images={digitalImages} />
    </div>
  );
} 