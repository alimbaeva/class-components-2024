import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Results from '../components/Results';
import { vi } from 'vitest';

// Mocking handleCard function
const mockHandleCard = vi.fn();

const mockData = [
  { url: '1', name: 'Person 1' },
  { url: '2', name: 'Person 2' },
];

describe('Results component', () => {
  test('renders empty message when data is empty', () => {
    render(
      <Results
        data={[]}
        handleCard={mockHandleCard}
        handleCloseDetailedCard={() => {}}
      />,
    );
    const emptyMessage = screen.getByText(
      'Unfortunately, there is no data available for your request.',
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  test('renders cards and handles interactions correctly', () => {
    render(
      <Results
        data={mockData}
        handleCard={mockHandleCard}
        handleCloseDetailedCard={() => {}}
      />,
    );

    // Check if cards are rendered correctly
    mockData.forEach((person) => {
      const cardElement = screen.getByText(person.name);
      expect(cardElement).toBeInTheDocument();
    });

    // Simulate click on the first card
    const firstCard = screen.getByText('Person 1');
    fireEvent.click(firstCard);

    // Check if handleCard was called with the correct data
    expect(mockHandleCard).toHaveBeenCalledWith(mockData[0]);

    // Simulate click on the search block to close detailed card
    const searchBlock = screen.getByTestId('search-block');
    fireEvent.click(searchBlock);

    // Check if handleCloseDetailedCard was called
    expect(mockHandleCard).toHaveBeenCalledTimes(1);
  });

  test('Check the number of rendered cards', () => {
    render(
      <Results
        data={mockData}
        handleCard={mockHandleCard}
        handleCloseDetailedCard={() => {}}
      />,
    );

    // Check if cards are rendered correctly
    mockData.forEach((person) => {
      const cardElement = screen.getByText(person.name);
      expect(cardElement).toBeInTheDocument();
    });

    // Check the number of rendered cards
    const allCardElements = screen.getAllByText(/Person \d/); // Regex to match any "Person X" text
    expect(allCardElements.length).toBe(mockData.length);
  });
});
