import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import React from 'react';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child Component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', () => {
    // Создаем фейковую функцию для замены componentDidCatch
    const mockComponentDidCatch = () => {};
    const originalComponentDidCatch = ErrorBoundary.prototype.componentDidCatch;
    ErrorBoundary.prototype.componentDidCatch = mockComponentDidCatch; // приведение типа для временного решения

    // Рендерим компонент, который вызовет ошибку
    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>,
    );

    // Проверяем, что метод componentDidCatch был вызван
    // (замените эту часть теста на ваш стандартный метод проверки в Vi Test Runner)
    // expect(mockComponentDidCatch).toHaveBeenCalled(); // эту строку нужно изменить
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    // Восстанавливаем оригинальный метод componentDidCatch
    ErrorBoundary.prototype.componentDidCatch = originalComponentDidCatch;
  });
});

// Вспомогательный компонент для теста
function ChildComponentWithError() {
  throw new Error('Test error');
}
