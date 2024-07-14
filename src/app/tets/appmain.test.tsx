import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App with ErrorBoundary', () => {
  it('renders App within ErrorBoundary', () => {
    const { getByTestId } = render(<App />);

    // Проверяем, что компонент App был успешно отрендерен
    expect(getByTestId('app-content')).toBeTruthy();
  });
});
