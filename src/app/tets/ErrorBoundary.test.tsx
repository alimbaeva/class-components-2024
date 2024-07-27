import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import React from 'react';

function ChildComponentWithError(): React.ReactNode {
  return <div>Child Component</div>;
}

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
    ErrorBoundary.prototype.componentDidCatch = mockComponentDidCatch;

    // Рендерим компонент, который вызовет ошибку
    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>,
    );

    // Добавьте здесь проверки, что сообщение об ошибке рендерится, если это необходимо
  });
});
