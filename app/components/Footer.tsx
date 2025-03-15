'use client';

import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm" style={{ color: 'rgb(153, 153, 153)' }}>© 2023 Sagadeeva Alina Albertovna. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="https://instagram.com/alina_sagadeeva" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
              <FaInstagram size={32} />
            </Link>
            <Link href="https://wa.me/+79123456789" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(153, 153, 153)' }} className="hover:opacity-80 transition-colors">
              <FaWhatsapp size={32} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 