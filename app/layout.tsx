import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

// Подключаем шрифты
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-montserrat',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair',
});

// Helvetica Neue - локальный шрифт, используем как fallback
const helveticaNeue = {
  variable: '--font-helvetica',
};

export const metadata: Metadata = {
  title: 'Сагадеева Алина | Модельное портфолио',
  description: 'Профессиональное портфолио модели Сагадеевой Алины',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${playfair.variable} ${helveticaNeue.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 