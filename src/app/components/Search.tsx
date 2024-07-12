import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Results from './Results';
import Loading from './Loading';
import { ResData } from '../types/interface';

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('inputValue') ?? '',
  );
  const [data, setData] = useState<ResData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchAnimals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = inputValue
        ? await api.findPeopleByName(inputValue)
        : await api.getPeoples(1);

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      setData(inputValue ? response : response.results);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError('An unknown error occurred');
        setLoading(false);
      }
    }
  };

  // Input change handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Function for processing form submission or receiving input value
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('inputValue', inputValue.trim());
    fetchAnimals();
  };

  const handleErrorButtonClick = () => {
    throw new Error('This is a test error');
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  if (isError) {
    handleErrorButtonClick();
    return;
  }

  return (
    <section>
      <div className="container search-block header">
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="inputSearch">People:</label>
          <input
            id="inputSearch"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Results data={data} />
      {loading && <Loading />}
      {error && (
        <div className="search-block">
          <p>Error: {error}</p>
        </div>
      )}
      <div className="container search-block error-throw">
        <button className="errorBtn" onClick={() => setIsError(true)}>
          Throw Error
        </button>
      </div>
    </section>
  );
};

export default Search;
