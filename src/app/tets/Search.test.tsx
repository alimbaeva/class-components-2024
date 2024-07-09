import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Search from '../components/Search';
import { api } from '../api/api';

// Mocking the api.search function
vi.mock('../api/api', () => ({
  api: {
    search: vi.fn(),
  },
}));

describe('Search component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render Search component', () => {
    render(<Search />);

    // Check if the Search component renders correctly
    expect(screen.getByLabelText('Animal:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should update input value on change', () => {
    render(<Search />);

    const inputElement = screen.getByRole('textbox', { name: 'Animal:' });
    fireEvent.change(inputElement, { target: { value: 'Dog' } });

    expect(inputElement).toHaveValue('Dog');
  });

  it('should handle form submission correctly', async () => {
    render(<Search />);

    const mockResponse = {
      animals: [
        { id: 1, name: 'Dog' },
        { id: 2, name: 'Cat' },
      ],
    };

    // Mocking the API response
    (api.search as jest.MockedFunction<typeof api.search>).mockResolvedValue(
      mockResponse,
    );

    const inputElement = screen.getByRole('textbox', { name: 'Animal:' });
    fireEvent.change(inputElement, { target: { value: 'Dog' } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if Results component renders with data
    expect(screen.getByText('Dog')).toBeInTheDocument();
    expect(screen.getByText('Cat')).toBeInTheDocument();
  });

  it('should handle error state correctly', async () => {
    render(<Search />);

    // Mocking an error response from the API
    (api.search as jest.MockedFunction<typeof api.search>).mockRejectedValue(
      new Error('Test error'),
    );

    const inputElement = screen.getByRole('textbox', { name: 'Animal:' });
    fireEvent.change(inputElement, { target: { value: 'Dog' } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });
  });
});
