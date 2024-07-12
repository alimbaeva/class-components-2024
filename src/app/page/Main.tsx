import React, { useEffect, useState } from 'react';
import Results from '../components/Results';
import Search from '../components/Search';
import { ResData } from '../types/interface';
import { api } from '../api/api';
import Loading from '../components/Loading';

const Main: React.FC = () => {
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

  const handleSearch = (value: string) => {
    console.log(value);
    setInputValue(value);
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
    return null;
  }

  return (
    <>
      <Search handleSearch={handleSearch} />
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
    </>
  );
};

export default Main;
