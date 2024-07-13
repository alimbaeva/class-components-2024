import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../components/Search';
import { vi } from 'vitest';

// Mock handleSearch function
const mockHandleSearch = vi.fn();

describe('Search component', () => {
  test('renders input field and submit button', () => {
    render(<Search handleSearch={mockHandleSearch} />);

    // Check if input field and submit button are rendered
    const inputElement = screen.getByLabelText('People:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('input value updates correctly', () => {
    render(<Search handleSearch={mockHandleSearch} />);

    // Simulate typing in the input field
    const inputElement = screen.getByLabelText('People:');
    fireEvent.change(inputElement, { target: { value: 'Luke Skywalker' } });

    // Check if input value updates correctly
    expect(inputElement).toHaveValue('Luke Skywalker');
  });

  test('submits form with trimmed input value and calls handleSearch', () => {
    render(<Search handleSearch={mockHandleSearch} />);

    // Simulate typing in the input field
    const inputElement = screen.getByLabelText('People:');
    fireEvent.change(inputElement, { target: { value: '  Darth Vader  ' } });

    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    // Check if localStorage was updated correctly
    expect(localStorage.getItem('inputValue')).toBe('Darth Vader');

    // Check if handleSearch was called with trimmed input value
    expect(mockHandleSearch).toHaveBeenCalledWith('Darth Vader');
  });
});
