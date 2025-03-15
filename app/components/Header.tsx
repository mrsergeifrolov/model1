'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" style={{ color: 'rgb(153, 153, 153)' }} className="text-xl uppercase tracking-widest font-light">
          Sagadeeva Alina
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="https://instagram.com/alina_sagadeeva" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
                <FiInstagram size={24} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/+79123456789" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 