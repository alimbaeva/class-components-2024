import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Main from '../page/Main';
import Page404 from '../page/Page404';
import { vi } from 'vitest';

vi.mock('../page/Main', () => ({
  __esModule: true,
  default: () => <div>Main Page</div>,
}));

vi.mock('../page/Page404', () => ({
  __esModule: true,
  default: () => <div>Page Not Found</div>,
}));

describe('App component', () => {
  test('renders Main component for the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  test('renders Page404 component for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
