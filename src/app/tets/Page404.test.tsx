import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Page404 from '../page/Page404';

describe('Page404', () => {
  it('renders with correct text and link', () => {
    render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>,
    );

    // Checking that the page title exists and contains the correct text
    const pageTitle = screen.getByRole('heading', {
      name: /this page does not exist/i,
    });
    expect(pageTitle).toBeInTheDocument();

    // We check that the link to the main page exists and contains the correct text and path
    const mainPageLink = screen.getByRole('link', { name: /main page/i });
    expect(mainPageLink).toBeInTheDocument();
    expect(mainPageLink).toHaveAttribute('href', '/'); // Проверяем, что ссылка ведет на корневой путь '/'
  });
});
