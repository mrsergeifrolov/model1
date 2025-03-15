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
  const [isMobile, setIsMobile] = useState(false);
  
  // Проверка размера экрана для определения мобильного устройства
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Рассчитываем общее количество страниц
  const totalPages = isMobile ? images.length : Math.ceil(images.length / 2);
  
  // Предзагрузка изображений
  useEffect(() => {
    const preloadImages = async () => {
      console.log('Начало предзагрузки изображений:', images.length, 'изображений');
      
      const imagePromises = images.map((image, index) => {
        return new Promise<void>((resolve) => {
          // Используем нативный объект Image для предзагрузки
          const img = new window.Image();
          console.log(`Загрузка изображения ${index + 1}/${images.length}:`, image.src);
          img.src = image.src;
          img.onload = () => {
            console.log(`Успешно загружено изображение ${index + 1}:`, image.src);
            setImagesLoaded(prev => ({ ...prev, [image.src]: true }));
            resolve();
          };
          img.onerror = (e) => {
            console.error(`Ошибка загрузки изображения ${index + 1}:`, image.src, e);
            // Даже при ошибке отмечаем изображение как "загруженное", чтобы не блокировать UI
            setImagesLoaded(prev => ({ ...prev, [image.src]: true }));
            resolve();
          };
        });
      });
      
      try {
        // Запускаем все запросы параллельно для максимально быстрой загрузки
        await Promise.all(imagePromises);
        console.log('Все изображения обработаны');
      } catch (error) {
        console.error('Ошибка при предзагрузке изображений:', error);
      }
    };
    
    // Запускаем предзагрузку с небольшой задержкой после монтирования компонента
    // Это позволяет браузеру сначала отрисовать UI
    const timer = setTimeout(() => {
      preloadImages();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [images]);

  // Обновляем видимость параметров модели при изменении страницы
  useEffect(() => {
    // На мобильных параметры всегда видны, на десктопе - только на первой странице
    setShowParams(isMobile || currentPage === 0);
  }, [currentPage, isMobile]);
  
  // Функция для получения индексов изображений для текущей страницы
  const getPageImages = (page: number) => {
    if (isMobile) {
      // На мобильных устройствах показываем одно изображение за раз
      // Убеждаемся, что мы используем правильный индекс
      if (page >= 0 && page < images.length) {
        return [images[page]];
      }
      return [images[0]]; // Безопасное значение по умолчанию
    } else {
      // На десктопе показываем по два изображения, учитывая, что на первой странице слева - параметры
      if (page === 0) {
        // Для первой страницы возвращаем только первое изображение (для правой половины)
        return [images[0]];
      } else {
        // Для последующих страниц сдвигаем на 1, так как на первой странице показали только одно изображение
        const startIndex = 1 + (page - 1) * 2;
        return images.slice(startIndex, startIndex + 2).filter(Boolean);
      }
    }
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
    
    // Сразу скрываем параметры модели при переходе с первой страницы (только для десктопа)
    if (!isMobile && currentPage === 0) {
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

  // Параметры модели
  const ModelParams = () => (
    <div className={`bg-black bg-opacity-80 transition-opacity duration-300 flex flex-col items-center justify-center ${isMobile ? 'w-full p-4 model-params-mobile' : 'h-full p-8 max-w-md'} ${(showParams || isMobile) ? 'opacity-100' : 'opacity-0 hidden'}`} data-testid="model-params">
      {isMobile ? (
        // Мобильная версия параметров - параметры отцентрированы, без отступов
        <div className="text-center text-sm w-full mobile-params-grid">
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>HEIGHT</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>170cm / 5'7"</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>BUST</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>90cm / 35.4"</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>WAIST</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>58cm / 22.8"</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>HIPS</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>88cm / 34.6"</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>HAIR</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>Dark brown</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>EYES</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>Brown</span>
          </div>
          <div className="inline-block mx-2">
            <span className="font-light uppercase" style={{ color: 'rgb(179, 179, 179)' }}>SHOES</span>
            <span className="mx-1">:</span>
            <span style={{ color: 'rgb(153, 153, 153)' }}>38EU</span>
          </div>
        </div>
      ) : (
        // Десктопная версия параметров
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
      )}
      
      {/* Социальные сети (показываются только в десктопной версии) */}
      {!isMobile && (
        <div className="mt-10 flex space-x-6 justify-center">
          <a href="https://www.instagram.com/saga_eva" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'rgb(179, 179, 179)' }}>
            <FaInstagram size={32} />
          </a>
          <a href="https://wa.me/+79818598470" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'rgb(179, 179, 179)' }}>
            <FaWhatsapp size={32} />
          </a>
        </div>
      )}
    </div>
  );

  // Мобильная версия соц.сетей (внизу экрана)
  const MobileSocialLinks = () => (
    <div className="mobile-social-links flex justify-center items-center">
      <a href="https://www.instagram.com/saga_eva" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80 mx-4" style={{ color: 'rgb(179, 179, 179)' }}>
        <FaInstagram size={32} />
      </a>
      <a href="https://wa.me/+79818598470" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80 mx-4" style={{ color: 'rgb(179, 179, 179)' }}>
        <FaWhatsapp size={32} />
      </a>
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
    
    if (isMobile) {
      // Мобильная версия - одно изображение на странице
      return (
        <div 
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          style={style}
          data-testid={`page-${index}`}
        >
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <div className="relative w-full h-full max-w-full flex items-center justify-center overflow-hidden image-container">
              <Image
                src={pageImages[0].src}
                alt={pageImages[0].alt}
                fill
                className="object-contain object-center"
                sizes="100vw"
                priority={true}
                loading="eager"
              />
            </div>
          </div>
        </div>
      );
    } else {
      // Десктопная версия - два изображения на странице
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
                <div className="relative w-full h-full max-w-full flex items-center justify-center overflow-hidden image-container carousel-image-wrapper">
                  <Image
                    src={pageImages[0].src}
                    alt={pageImages[0].alt}
                    fill
                    className="object-contain object-center"
                    sizes="50vw"
                    priority={true}
                    loading="eager"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Правая половина */}
          <div 
            className="w-1/2 h-full relative cursor-finger-right bg-black flex items-center justify-center" 
            onClick={handleRightClick}
          >
            <div className="relative w-full h-full max-w-full flex items-center justify-center overflow-hidden image-container carousel-image-wrapper">
              <Image
                src={pageImages.length > 1 ? pageImages[1].src : pageImages[0].src}
                alt={pageImages.length > 1 ? pageImages[1].alt : pageImages[0].alt}
                fill
                className="object-contain object-center"
                sizes="50vw"
                priority={true}
                loading="eager"
              />
            </div>
          </div>
        </div>
      );
    }
  });

  // Мобильный макет
  if (isMobile) {
    return (
      <div className="flex flex-col h-full pt-16 bg-black mobile-carousel-container overflow-y-auto">
        {/* Параметры модели (на мобильных сверху) */}
        <div className="w-full">
          <ModelParams />
        </div>

        {/* Иконки соцсетей на мобильных над каруселью */}
        <div className="w-full flex justify-center items-center py-4">
          <MobileSocialLinks />
        </div>
        
        {/* Контейнер карусели */}
        <div className="relative flex-grow w-full mx-0 px-0" style={{ minHeight: '80vh' }}>
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
          
          <div className="relative h-full w-full">
            {/* Отображаем все страницы */}
            {pages}
            
            {/* Кнопки навигации без градиента в мобильной версии */}
            <div 
              onClick={handleLeftClick}
              className="absolute left-0 top-0 h-full w-12 z-20 cursor-finger-left flex items-center justify-start pl-4"
              aria-label="Previous photo"
            >
              <FiChevronLeft size={24} className="text-white opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            
            <div 
              onClick={handleRightClick}
              className="absolute right-0 top-0 h-full w-12 z-20 cursor-finger-right flex items-center justify-end pr-4"
              aria-label="Next photo"
            >
              <FiChevronRight size={24} className="text-white opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        
        {/* Добавляем просто отступ внизу */}
        <div className="w-full h-32"></div>
      </div>
    );
  }

  // Десктопный макет (оригинальный)
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