'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Инициализация при монтировании
    checkIsMobile();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isMobile ? 'bg-black shadow-md py-2' : (isScrolled ? 'bg-black shadow-md py-2' : 'bg-transparent py-4')}`}>
      <div className={`container mx-auto px-4 ${isMobile ? 'flex justify-center items-center' : 'flex justify-between items-center'}`}>
        {isMobile ? (
          <Link 
            href="/" 
            style={{ color: 'white' }} 
            className="uppercase font-light mobile-header-title text-lg whitespace-nowrap overflow-hidden w-full text-center"
          >
            MODEL | Sagadeeva Alina
          </Link>
        ) : (
          <>
            <Link 
              href="/" 
              style={{ color: 'white' }} 
              className="uppercase font-light mobile-header-title text-2xl tracking-widest"
            >
              MODEL | Sagadeeva Alina
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="https://www.instagram.com/saga_eva" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
                    <FiInstagram size={24} />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/+79818598470" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
                    <FaWhatsapp size={24} />
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 