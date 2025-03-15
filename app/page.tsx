import DigitalsCarousel from './components/DigitalsCarousel';

export default function Home() {
  // Массив с изображениями для карусели
  const digitalImages = [
    {
      id: 1,
      src: '/images/optimized/IMG_0672.jpg',
      alt: 'Sagadeeva Alina - digital photo 1',
    },
    {
      id: 2,
      src: '/images/optimized/IMG_0673.jpg',
      alt: 'Sagadeeva Alina - digital photo 2',
    },
    {
      id: 3,
      src: '/images/optimized/IMG_0674.jpg',
      alt: 'Sagadeeva Alina - digital photo 3',
    },
    {
      id: 4,
      src: '/images/optimized/IMG_0676.jpg',
      alt: 'Sagadeeva Alina - digital photo 4',
    },
    {
      id: 5,
      src: '/images/optimized/IMG_0679.jpg',
      alt: 'Sagadeeva Alina - digital photo 5',
    },
    {
      id: 6,
      src: '/images/optimized/IMG_0680.jpg',
      alt: 'Sagadeeva Alina - digital photo 6',
    },
  ];

  return (
    <div className="h-screen">
      <DigitalsCarousel images={digitalImages} />
    </div>
  );
} 