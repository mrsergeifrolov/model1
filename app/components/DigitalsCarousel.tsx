'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface DigitalsCarouselProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
}

const DigitalsCarousel: React.FC<DigitalsCarouselProps> = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [showParams, setShowParams] = useState(true);
  
  // Рассчитываем общее количество страниц
  const totalPages = Math.ceil(images.length / 2);
  
  // Предзагрузка изображений
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = image.src;
          img.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [image.src]: true }));
            resolve();
          };
          img.onerror = () => {
            setImagesLoaded(prev => ({ ...prev, [image.src]: true })); // Считаем загруженным даже при ошибке
            resolve();
          };
        });
      });
      
      await Promise.all(imagePromises);
    };
    
    preloadImages();
  }, [images]);

  // Обновляем видимость параметров модели при изменении страницы
  useEffect(() => {
    setShowParams(currentPage === 0);
  }, [currentPage]);
  
  // Функция для получения индексов изображений для текущей страницы
  const getPageImages = (page: number) => {
    const startIndex = page * 2;
    return images.slice(startIndex, startIndex + 2).filter(Boolean);
  };

  // Получаем изображения для текущей страницы
  const currentImages = getPageImages(currentPage);

  // Проверяем, загружены ли все изображения
  const areImagesLoaded = images.every(img => imagesLoaded[img.src]);

  // Навигация с анимацией выкатывания
  const navigateToPage = (targetPage: number, moveDirection: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(moveDirection);
    setPrevPage(currentPage);
    
    // Сразу скрываем параметры модели при переходе с первой страницы
    if (currentPage === 0) {
      setShowParams(false);
    }
    
    // Изменяем страницу сразу, остальное обрабатываем через CSS-анимации
    setCurrentPage(targetPage);
    
    // После завершения анимации
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 500); // Время анимации
  };

  const goToPrevious = () => {
    const targetPage = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    navigateToPage(targetPage, 'left');
  };

  const goToNext = () => {
    const targetPage = currentPage === totalPages - 1 ? 0 : currentPage + 1;
    navigateToPage(targetPage, 'right');
  };

  // Обработчик для точек навигации
  const handleDotClick = (index: number) => {
    if (isAnimating || currentPage === index || !areImagesLoaded) return;
    
    // Определяем направление движения
    const moveDirection = index > currentPage ? 'right' : 'left';
    navigateToPage(index, moveDirection);
  };

  // Параметры модели (всегда отображаются слева на первой странице)
  const ModelParams = () => (
    <div className={`bg-black bg-opacity-80 p-8 max-w-md transition-opacity duration-300 flex flex-col items-center justify-center h-full ${showParams ? 'opacity-100' : 'opacity-0 hidden'}`} data-testid="model-params">
      <div className="space-y-4 text-base text-white text-center">
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>HEIGHT</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>170cm / 5'7"</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>BUST</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>90cm / 35.4"</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>WAIST</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>58cm / 22.8"</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>HIPS</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>88cm / 34.6"</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>HAIR</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>Dark brown</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>EYES</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>Brown</span>
        </div>
        <div className="flex justify-center">
          <span className="w-24 font-light uppercase text-sm text-right pr-3" style={{ color: 'rgb(179, 179, 179)' }}>SHOES</span>
          <span className="text-sm text-left" style={{ color: 'rgb(153, 153, 153)' }}>38EU / 7.5US / 5UK</span>
        </div>
      </div>
      
      {/* Социальные сети */}
      <div className="mt-10 flex space-x-6 justify-center">
        <a href="https://www.instagram.com/saga_eva" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'rgb(179, 179, 179)' }}>
          <FaInstagram size={32} />
        </a>
        <a href="https://wa.me/+79818598470" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'rgb(179, 179, 179)' }}>
          <FaWhatsapp size={32} />
        </a>
      </div>
    </div>
  );

  // Обработчики кликов для предотвращения двойного срабатывания
  const handleLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    if (!isAnimating && areImagesLoaded) {
      goToPrevious();
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    if (!isAnimating && areImagesLoaded) {
      goToNext();
    }
  };

  // Определяем положение страницы в зависимости от её номера и состояния анимации
  const getPageInitialPosition = (index: number) => {
    if (!isAnimating) {
      if (index === currentPage) {
        return { transform: 'translateX(0)', zIndex: 10, opacity: 1 };
      } else {
        // Скрываем неактивные страницы
        return { transform: index < currentPage ? 'translateX(-100%)' : 'translateX(100%)', zIndex: 0, opacity: 0 };
      }
    }
    
    if (isAnimating && direction === 'right') {
      // Анимация вправо
      if (index === currentPage) {
        // Новая страница входит справа
        return { 
          transform: 'translateX(0)', 
          zIndex: 10, 
          opacity: 1,
          transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
          animation: 'slide-in-right 500ms forwards' 
        };
      } else if (index === prevPage) {
        // Текущая страница уходит влево
        return { 
          transform: 'translateX(-100%)', 
          zIndex: 5, 
          opacity: 1,
          transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
          animation: 'slide-out-left 500ms forwards' 
        };
      }
    } else if (isAnimating && direction === 'left') {
      // Анимация влево
      if (index === currentPage) {
        // Новая страница входит слева
        return { 
          transform: 'translateX(0)', 
          zIndex: 10, 
          opacity: 1,
          transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
          animation: 'slide-in-left 500ms forwards' 
        };
      } else if (index === prevPage) {
        // Текущая страница уходит вправо
        return { 
          transform: 'translateX(100%)', 
          zIndex: 5, 
          opacity: 1,
          transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
          animation: 'slide-out-right 500ms forwards' 
        };
      }
    }
    
    // Все остальные страницы скрыты
    return { transform: index < currentPage ? 'translateX(-100%)' : 'translateX(100%)', zIndex: 0, opacity: 0 };
  };

  // Создаем массив всех страниц для отображения
  const pages = Array.from({ length: totalPages }).map((_, index) => {
    const pageImages = getPageImages(index);
    const style = getPageInitialPosition(index);
    
    return (
      <div 
        key={index}
        className="absolute inset-0 flex"
        style={style}
        data-testid={`page-${index}`}
      >
        {/* Левая половина */}
        <div className="w-1/2 h-full flex items-center justify-center cursor-finger-left" onClick={handleLeftClick}>
          {index === 0 ? (
            <ModelParams />
          ) : (
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <Image
                src={pageImages[0].src}
                alt={pageImages[0].alt}
                fill
                className="object-contain object-center"
              />
            </div>
          )}
        </div>
        
        {/* Правая половина */}
        <div 
          className="w-1/2 h-full relative cursor-finger-right bg-black flex items-center justify-center" 
          onClick={handleRightClick}
        >
          <Image
            src={pageImages.length > 1 ? pageImages[1].src : pageImages[0].src}
            alt={pageImages.length > 1 ? pageImages[1].alt : pageImages[0].alt}
            fill
            className="object-contain object-center"
          />
        </div>
      </div>
    );
  });

  return (
    <div className="relative h-full w-full overflow-hidden pt-16">
      {/* Индикатор загрузки */}
      {!areImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50" role="status" aria-label="Loading images">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slide-out-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slide-out-right {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
      
      <div className="relative h-full w-full overflow-hidden">
        {/* Отображаем все страницы */}
        {pages}
        
        {/* Градиентная область слева */}
        <div 
          onClick={handleLeftClick}
          className="absolute left-0 top-0 h-full w-12 md:w-16 lg:w-20 bg-gradient-to-r from-black to-transparent z-20 cursor-finger-left flex items-center justify-start pl-4"
          aria-label="Previous photo"
        >
          <FiChevronLeft size={36} className="text-white opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Градиентная область справа */}
        <div 
          onClick={handleRightClick}
          className="absolute right-0 top-0 h-full w-12 md:w-16 lg:w-20 bg-gradient-to-l from-black to-transparent z-20 cursor-finger-right flex items-center justify-end pr-4"
          aria-label="Next photo"
        >
          <FiChevronRight size={36} className="text-white opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

export default DigitalsCarousel;