import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { vi, Mock } from 'vitest';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    MemoryRouter: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const mockUseLocation = vi.fn();
const mockUseNavigate = vi.fn();

beforeEach(() => {
  (useLocation as Mock).mockReturnValue(mockUseLocation);
  (useNavigate as Mock).mockReturnValue(mockUseNavigate);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Pagination', () => {
  test('clicking next button navigates to next page and updates currentPage', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination
          allCount={50}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);

    // Check currentPage state update
    expect(screen.getByText('2')).toHaveClass('activ');
  });

  test('clicking prev button navigates to previous page and updates currentPage', () => {
    render(
      <MemoryRouter initialEntries={['/?search=l&page=2']}>
        <Pagination
          allCount={20}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText('prev');
    fireEvent.click(prevButton);

    expect(screen.getByText('1')).toHaveClass('activ');
  });

  test('prev button is disabled on first page', () => {
    render(
      <MemoryRouter initialEntries={['/?search=l&page=2']}>
        <Pagination
          allCount={50}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText('prev');
    fireEvent.click(prevButton);

    // Check navigation should not have been called on first page
    expect(mockUseNavigate).not.toHaveBeenCalled();

    // Check currentPage state remains 1
    expect(screen.getByText('1')).toHaveClass('activ');
  });

  test('next button is disabled on last page', () => {
    render(
      <MemoryRouter initialEntries={['/?search=l&page=1']}>
        <Pagination
          allCount={10}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);

    // Check navigation should not have been called on last page
    expect(mockUseNavigate).not.toHaveBeenCalled();

    expect(screen.getByText('1')).toHaveClass('activ');
  });

  test('renders page buttons correctly and handles clicks', () => {
    // Rendering the Pagination component in MemoryRouter
    render(
      <MemoryRouter>
        <Pagination
          allCount={50}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    // Checking that all page buttons are present on the page
    const pages = [1, 2, 3, 4, 5];
    pages.forEach((page) => {
      const pageButton = screen.getByText(page.toString());
      expect(pageButton).toBeInTheDocument();
    });

    // Check that the current page button has the 'activ' class
    expect(screen.getByText('1')).toHaveClass('activ');

    // Simulating a click on the second page button
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    // Checking that the handleSetPage function was called with argument 2
    expect(mockUseNavigate).toHaveBeenCalled();
  });

  test('renders page buttons correctly and handles clicks', () => {
    // Rendering the Pagination component in MemoryRouter
    render(
      <MemoryRouter>
        <Pagination
          allCount={50}
          handleSetPage={() => {}}
          isSearchResult={false}
        />
      </MemoryRouter>,
    );

    // Checking that all page buttons are present on the page
    const pages = [1, 2, 3, 4, 5];
    pages.forEach((page) => {
      const pageButton = screen.getByText(page.toString());
      expect(pageButton).toBeInTheDocument();
    });

    // Check that the current page button has the 'activ' class
    expect(screen.getByText('1')).toHaveClass('activ');

    // Simulating a click on the second page button
    const page2Button = screen.getByText('4');
    fireEvent.click(page2Button);

    // Checking that the handleSetPage function was called with argument 2
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});
