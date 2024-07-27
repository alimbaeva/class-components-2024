import React, { useState } from 'react';
import { SearchProps } from '../types/interface';
import { useTheme } from './ThemeProvider';

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') ?? '',
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('inputValue', inputValue.trim());
    handleSearch(inputValue.trim());
  };

  return (
    <section>
      <div className="theme-btn">
        <button onClick={toggleTheme}>{theme}</button>
      </div>
      <div className="container search-block header">
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="inputSearch">People:</label>
          <input
            data-testid="inputSearch"
            id="inputSearch"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Search;
