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

    // Проверяем, что заголовок страницы существует и содержит правильный текст
    const pageTitle = screen.getByRole('heading', {
      name: /this page does not exist/i,
    });
    expect(pageTitle).toBeInTheDocument();

    // Проверяем, что ссылка на главную страницу существует и содержит правильный текст и путь
    const mainPageLink = screen.getByRole('link', { name: /main page/i });
    expect(mainPageLink).toBeInTheDocument();
    expect(mainPageLink).toHaveAttribute('href', '/'); // Проверяем, что ссылка ведет на корневой путь '/'
  });
});
