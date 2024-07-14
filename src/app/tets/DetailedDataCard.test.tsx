import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import DetailedDataCard from '../components/DetailedCard';
import { CardPropsDetail } from '../types/interface';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';

// Mock useNavigate and useLocation
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

const mockNavigate = vi.fn();
const mockUseLocation = {
  pathname: '/somepath',
  search: '?somequery',
};

const mockData: CardPropsDetail['data'] = {
  name: 'John Doe',
  gender: 'male',
  url: 'http://example.com/johndoe/1/',
  birth_year: 'unknown',
  created: '2024-07-13T12:00:00Z',
  edited: '2024-07-13T12:00:00Z',
  eye_color: 'blue',
  hair_color: 'black',
  height: '180',
  mass: '75',
  skin_color: 'light',
  homeworld: 'http://example.com/planet',
  films: [],
  species: [],
  starships: [],
  vehicles: [],
};

const mockHandleCloseDetailedCard = vi.fn();

const detailedCardProps: CardPropsDetail = {
  data: mockData,
  handleCloseDetailedCard: mockHandleCloseDetailedCard,
};

describe('DetailedDataCard', () => {
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue(mockUseLocation);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders DetailedDataCard component with data', () => {
    render(
      <MemoryRouter>
        <DetailedDataCard {...detailedCardProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // Using a function for more flexible text matching
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    expect(screen.getByText(/180/i)).toBeInTheDocument();
    expect(screen.getByText(/black/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin color/i)).toBeInTheDocument();
    expect(screen.getByText(/Created/i)).toBeInTheDocument();
  });

  test('calls handleCloseDetailedCard on button click', () => {
    render(
      <MemoryRouter>
        <DetailedDataCard {...detailedCardProps} />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: /X/i });

    fireEvent.click(button);

    expect(mockHandleCloseDetailedCard).toHaveBeenCalled();
  });

  test('navigates to detailed URL on mount', () => {
    render(
      <MemoryRouter>
        <DetailedDataCard {...detailedCardProps} />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/somepath?somequery&detail=1');
  });
});
