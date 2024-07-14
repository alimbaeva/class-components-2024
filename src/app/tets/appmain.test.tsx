import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App with ErrorBoundary', () => {
  it('renders App within ErrorBoundary', () => {
    const { getByTestId } = render(<App />);

    // Checking that the App component was successfully rendered
    expect(getByTestId('app-content')).toBeTruthy();
  });
});
