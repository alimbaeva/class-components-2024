import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Main from '../page/Main';
import { api } from '../api/api';

vi.mock('../api/api');

describe('Main component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders Main component successfully', async () => {
    (api.getPeoples as vi.Mock).mockResolvedValue({
      results: [],
      count: 0,
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('People:')).toBeInTheDocument();
    await waitFor(() => expect(api.getPeoples).toHaveBeenCalled());
  });

  test('performs search and renders results', async () => {
    const mockResults = [
      { url: '1', name: 'Person 1' },
      { url: '2', name: 'Person 2' },
    ];

    (api.findPeopleByName as vi.Mock).mockResolvedValue(mockResults);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>,
    );

    const input = screen.getByLabelText('People:');
    fireEvent.change(input, { target: { value: 'test' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(api.findPeopleByName).toHaveBeenCalledWith('test'),
    );
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 2')).toBeInTheDocument();
  });
});
