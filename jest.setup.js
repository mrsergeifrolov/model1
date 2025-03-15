import '@testing-library/jest-dom';

// Мокаем next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Преобразуем boolean атрибуты в строки
    const imgProps = { ...props };
    if (typeof imgProps.fill === 'boolean') {
      imgProps.fill = imgProps.fill.toString();
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

// Мокаем react-icons
jest.mock('react-icons/fi', () => ({
  FiChevronLeft: () => <div data-testid="left-arrow" />,
  FiChevronRight: () => <div data-testid="right-arrow" />,
})); 