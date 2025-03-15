'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Примеры категорий и изображений для портфолио
const categories = [
  { id: 'all', name: 'Все' },
  { id: 'fashion', name: 'Мода' },
  { id: 'portrait', name: 'Портреты' },
  { id: 'commercial', name: 'Коммерческие' },
  { id: 'editorial', name: 'Редакционные' },
];

const portfolioItems = [
  {
    id: 1,
    category: 'fashion',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Fashion+1',
    alt: 'Fashion Photo 1',
    title: 'Модная фотосессия 1',
  },
  {
    id: 2,
    category: 'portrait',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Portrait+1',
    alt: 'Portrait Photo 1',
    title: 'Портретная фотосессия 1',
  },
  {
    id: 3,
    category: 'commercial',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Commercial+1',
    alt: 'Commercial Photo 1',
    title: 'Коммерческая фотосессия 1',
  },
  {
    id: 4,
    category: 'editorial',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Editorial+1',
    alt: 'Editorial Photo 1',
    title: 'Редакционная фотосессия 1',
  },
  {
    id: 5,
    category: 'fashion',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Fashion+2',
    alt: 'Fashion Photo 2',
    title: 'Модная фотосессия 2',
  },
  {
    id: 6,
    category: 'portrait',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Portrait+2',
    alt: 'Portrait Photo 2',
    title: 'Портретная фотосессия 2',
  },
  {
    id: 7,
    category: 'commercial',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Commercial+2',
    alt: 'Commercial Photo 2',
    title: 'Коммерческая фотосессия 2',
  },
  {
    id: 8,
    category: 'editorial',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Editorial+2',
    alt: 'Editorial Photo 2',
    title: 'Редакционная фотосессия 2',
  },
  {
    id: 9,
    category: 'fashion',
    src: 'https://placehold.co/800x1000/f5f5f5/000000?text=Fashion+3',
    alt: 'Fashion Photo 3',
    title: 'Модная фотосессия 3',
  },
];

const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const selectedItem = selectedImage !== null
    ? portfolioItems.find(item => item.id === selectedImage)
    : null;

  return (
    <div className="section">
      <div className="container">
        {/* Категории */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-none transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Галерея */}
        <motion.div 
          className="gallery-grid"
          layout
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] cursor-pointer overflow-hidden group"
              onClick={() => openLightbox(item.id)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                <div className="p-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Лайтбокс */}
        {selectedImage !== null && selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={800}
                height={1000}
                className="object-contain max-h-[90vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <h3 className="text-xl">{selectedItem.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioGallery; 