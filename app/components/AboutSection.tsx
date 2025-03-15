'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0"
          >
            <Image
              src="https://placehold.co/600x800/f5f5f5/000000?text=Model+Photo"
              alt="Фотомодель"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Обо мне</h2>
            <p className="mb-4 text-gray-700">
              Привет! Меня зовут [Имя Модели], я профессиональная фотомодель с опытом работы более 5 лет в индустрии моды и рекламы.
            </p>
            <p className="mb-4 text-gray-700">
              Я специализируюсь на fashion-съемках, портретной фотографии и коммерческих проектах. За время своей карьеры я сотрудничала с известными брендами и фотографами, участвовала в показах мод и рекламных кампаниях.
            </p>
            <p className="mb-6 text-gray-700">
              Моя цель — создавать уникальные и запоминающиеся образы, которые помогают брендам выделяться и привлекать внимание аудитории.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-xl font-medium mb-2">Параметры</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Рост: 175 см</li>
                  <li>Вес: 54 кг</li>
                  <li>Размер одежды: 42-44 (EU)</li>
                  <li>Размер обуви: 38 (EU)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Навыки</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Позирование</li>
                  <li>Актерское мастерство</li>
                  <li>Танцы</li>
                  <li>Макияж</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/portfolio" className="btn btn-primary">
                Смотреть портфолио
              </a>
              <a href="/contact" className="btn btn-outline">
                Связаться со мной
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 