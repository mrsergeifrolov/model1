'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';

// Примеры изображений для слайдера
const sliderImages = [
  {
    id: 1,
    src: 'https://placehold.co/1920x1080/f5f5f5/000000?text=Fashion+Photo+1',
    alt: 'Fashion Photo 1',
    title: 'Высокая мода',
    description: 'Фотосессия для модного журнала',
  },
  {
    id: 2,
    src: 'https://placehold.co/1920x1080/f5f5f5/000000?text=Portrait+Photo+2',
    alt: 'Portrait Photo 2',
    title: 'Портретная съемка',
    description: 'Студийная фотосессия',
  },
  {
    id: 3,
    src: 'https://placehold.co/1920x1080/f5f5f5/000000?text=Commercial+Photo+3',
    alt: 'Commercial Photo 3',
    title: 'Коммерческая съемка',
    description: 'Рекламная кампания',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        onChange={handleChange}
        className="h-full"
      >
        {sliderImages.map((image) => (
          <div key={image.id} className="relative h-screen">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === image.id - 1 ? 1 : 0, y: currentSlide === image.id - 1 ? 0 : 20 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white px-4"
              >
                <h2 className="text-4xl md:text-6xl font-serif mb-4">{image.title}</h2>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto">{image.description}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider; 