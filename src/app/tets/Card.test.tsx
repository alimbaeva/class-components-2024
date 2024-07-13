import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';
import { CardProps } from '../types/interface';
import { vi } from 'vitest';

const mockData = {
  name: 'John Doe',
  gender: 'male',
  url: 'http://example.com/johndoe',
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

const mockHandleCard = vi.fn();

const cardProps: CardProps = {
  data: mockData,
  handleCard: mockHandleCard,
};

test('renders Card component with data', () => {
  render(<Card {...cardProps} />);

  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
});

test('calls handleCard on button click', () => {
  render(<Card {...cardProps} />);
  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(mockHandleCard).toHaveBeenCalledWith(mockData);
});
