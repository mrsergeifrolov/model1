import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DigitalsCarousel from '../app/components/DigitalsCarousel';

// Мокаем изображения для тестов
const mockImages = [
  { id: 1, src: '/images/digital1.jpg', alt: 'Сагадеева Алина - фото 1' },
  { id: 2, src: '/images/digital2.jpg', alt: 'Сагадеева Алина - фото 2' },
  { id: 3, src: '/images/digital3.jpg', alt: 'Сагадеева Алина - фото 3' },
  { id: 4, src: '/images/digital4.jpg', alt: 'Сагадеева Алина - фото 4' },
  { id: 5, src: '/images/digital5.jpg', alt: 'Сагадеева Алина - фото 5' },
  { id: 6, src: '/images/digital6.jpg', alt: 'Сагадеева Алина - фото 6' },
];

// Мокаем window.Image для тестов
class MockImage {
  onload: () => void = () => {};
  onerror: () => void = () => {};
  src: string = '';
  
  constructor() {
    setTimeout(() => {
      this.onload();
    }, 10);
  }
}

// Устанавливаем глобальный мок для window.Image
global.Image = MockImage as any;

describe('DigitalsCarousel Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
    // Сбрасываем все таймеры перед каждым тестом
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('должен отображать индикатор загрузки, пока изображения загружаются', () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Проверяем, что индикатор загрузки отображается
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // После загрузки индикатор должен исчезнуть
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('должен отображать параметры модели на первой странице', async () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Проверяем, что параметры модели отображаются
    const modelParams = screen.getByTestId('model-params');
    expect(modelParams).toBeInTheDocument();
    expect(modelParams).toHaveClass('opacity-100');
    expect(modelParams).not.toHaveClass('hidden');
    
    // Проверяем, что отображается первая страница
    expect(screen.getByTestId('page-0')).toHaveClass('translate-x-0');
  });

  test('должен переключаться на следующую страницу при нажатии на правую стрелку', async () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Находим кнопку "Next"
    const nextButton = screen.getByLabelText('Next photo');
    
    // Проверяем, что кнопка активна
    expect(nextButton).not.toBeDisabled();
    
    // Нажимаем на кнопку
    fireEvent.click(nextButton);
    
    // Проверяем, что кнопка стала неактивной во время анимации
    expect(nextButton).toBeDisabled();
    
    // Проверяем, что параметры модели скрыты сразу после клика
    const modelParams = screen.getAllByTestId('model-params')[0];
    expect(modelParams).toHaveClass('opacity-0');
    expect(modelParams).toHaveClass('hidden');
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что кнопка снова активна
    expect(nextButton).not.toBeDisabled();
    
    // Проверяем, что отображается вторая страница
    expect(screen.getByTestId('page-1')).toHaveClass('translate-x-0');
  });

  test('должен переключаться на предыдущую страницу при нажатии на левую стрелку', async () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Находим кнопку "Previous"
    const prevButton = screen.getByLabelText('Previous photo');
    
    // Проверяем, что кнопка активна
    expect(prevButton).not.toBeDisabled();
    
    // Нажимаем на кнопку
    fireEvent.click(prevButton);
    
    // Проверяем, что кнопка стала неактивной во время анимации
    expect(prevButton).toBeDisabled();
    
    // Проверяем, что параметры модели скрыты сразу после клика
    const modelParams = screen.getAllByTestId('model-params')[0];
    expect(modelParams).toHaveClass('opacity-0');
    expect(modelParams).toHaveClass('hidden');
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что кнопка снова активна
    expect(prevButton).not.toBeDisabled();
    
    // Проверяем, что отображается последняя страница
    const totalPages = Math.ceil(mockImages.length / 2);
    expect(screen.getByTestId(`page-${totalPages - 1}`)).toHaveClass('translate-x-0');
  });

  test('не должен реагировать на множественные клики во время анимации', async () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Находим кнопку "Next"
    const nextButton = screen.getByLabelText('Next photo');
    
    // Нажимаем на кнопку
    fireEvent.click(nextButton);
    
    // Пытаемся нажать еще раз во время анимации
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    // Проверяем, что параметры модели скрыты сразу после клика
    const modelParams = screen.getAllByTestId('model-params')[0];
    expect(modelParams).toHaveClass('opacity-0');
    expect(modelParams).toHaveClass('hidden');
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что отображается вторая страница (а не третья или четвертая)
    expect(screen.getByTestId('page-1')).toHaveClass('translate-x-0');
    
    // Нажимаем на кнопку "Previous", чтобы вернуться на первую страницу
    const prevButton = screen.getByLabelText('Previous photo');
    fireEvent.click(prevButton);
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что мы вернулись на первую страницу и параметры модели видны
    const updatedModelParams = screen.getAllByTestId('model-params')[0];
    expect(updatedModelParams).toHaveClass('opacity-100');
    expect(updatedModelParams).not.toHaveClass('hidden');
    expect(screen.getByTestId('page-0')).toHaveClass('translate-x-0');
  });

  test('должен переключаться на выбранную страницу при нажатии на точку навигации', async () => {
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Находим точки навигации
    const dots = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.startsWith('Go to page')
    );
    
    // Проверяем, что у нас есть точки навигации
    expect(dots.length).toBeGreaterThan(1);
    
    // Нажимаем на вторую точку
    fireEvent.click(dots[1]);
    
    // Проверяем, что параметры модели скрыты сразу после клика
    const modelParams = screen.getAllByTestId('model-params')[0];
    expect(modelParams).toHaveClass('opacity-0');
    expect(modelParams).toHaveClass('hidden');
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что отображается вторая страница
    expect(screen.getByTestId('page-1')).toHaveClass('translate-x-0');
    
    // Нажимаем на первую точку
    fireEvent.click(dots[0]);
    
    // Имитируем завершение анимации
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что мы вернулись на первую страницу и параметры модели видны
    const updatedModelParams = screen.getAllByTestId('model-params')[0];
    expect(updatedModelParams).toHaveClass('opacity-100');
    expect(updatedModelParams).not.toHaveClass('hidden');
    expect(screen.getByTestId('page-0')).toHaveClass('translate-x-0');
  });

  test('должен стабильно отображать вторую страницу после перехода на нее и через несколько секунд', async () => {
    // Создаем шпион для console.log, чтобы отслеживать вызовы
    const consoleLogSpy = jest.spyOn(console, 'log');
    
    console.log('Начало теста на стабильность отображения второй страницы');
    
    render(<DigitalsCarousel images={mockImages} />);
    
    // Имитируем загрузку изображений
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    console.log('Изображения загружены');
    
    // Проверяем, что мы на первой странице
    expect(screen.getByTestId('page-0')).toHaveClass('translate-x-0');
    
    // Находим кнопку "Next"
    const nextButton = screen.getByLabelText('Next photo');
    
    // Нажимаем на кнопку, чтобы перейти на вторую страницу
    console.log('Нажимаем на кнопку Next');
    fireEvent.click(nextButton);
    
    // Проверяем, что параметры модели скрыты сразу после клика
    const modelParams = screen.getAllByTestId('model-params')[0];
    expect(modelParams).toHaveClass('opacity-0');
    expect(modelParams).toHaveClass('hidden');
    
    // Имитируем завершение анимации
    console.log('Продвигаем таймеры на 600мс для завершения анимации');
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что мы на второй странице
    console.log('Проверяем, что мы на второй странице');
    expect(screen.getByTestId('page-1')).toHaveClass('translate-x-0');
    
    // Проверяем, что таймеры активны
    console.log('Количество активных таймеров:', jest.getTimerCount());
    
    // Создаем искусственный таймер, чтобы имитировать реальное время
    console.log('Создаем искусственный таймер на 3000мс');
    let timerTriggered = false;
    setTimeout(() => {
      timerTriggered = true;
      console.log('Искусственный таймер сработал');
    }, 3000);
    
    // Проверяем, что таймеры активны после создания искусственного таймера
    console.log('Количество активных таймеров после создания:', jest.getTimerCount());
    
    // Имитируем прошествие 3 секунд
    console.log('Продвигаем таймеры на 3000мс');
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Проверяем, что искусственный таймер сработал
    console.log('Искусственный таймер сработал:', timerTriggered);
    expect(timerTriggered).toBe(true);
    
    console.log('Таймеры продвинуты на 3000мс');
    
    // Проверяем, что мы все еще на второй странице
    console.log('Проверяем, что мы все еще на второй странице');
    expect(screen.getByTestId('page-1')).toHaveClass('translate-x-0');
    
    // Проверяем, что параметры модели все еще скрыты
    console.log('Проверяем, что параметры модели все еще скрыты');
    const modelParamsAfterWait = screen.getAllByTestId('model-params')[0];
    expect(modelParamsAfterWait).toHaveClass('opacity-0');
    expect(modelParamsAfterWait).toHaveClass('hidden');
    
    // Проверяем, что кнопка навигации для второй страницы активна
    console.log('Проверяем, что кнопка навигации для второй страницы активна');
    const dots = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.startsWith('Go to page')
    );
    expect(dots[1]).toHaveClass('bg-black'); // Вторая точка должна быть активной
    expect(dots[0]).not.toHaveClass('bg-black'); // Первая точка должна быть неактивной
    
    // Пробуем нажать на кнопку Next еще раз после ожидания
    console.log('Нажимаем на кнопку Next еще раз после ожидания');
    fireEvent.click(nextButton);
    
    // Имитируем завершение анимации
    console.log('Продвигаем таймеры на 600мс для завершения второй анимации');
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Проверяем, что мы перешли на третью страницу
    console.log('Проверяем, что мы перешли на третью страницу');
    expect(screen.getByTestId('page-2')).toHaveClass('translate-x-0');
    
    console.log('Тест на стабильность отображения второй страницы завершен');
    
    // Восстанавливаем console.log
    consoleLogSpy.mockRestore();
  });
}); 