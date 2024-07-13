import React, { useEffect, useState } from 'react';
import Results from '../components/Results';
import Search from '../components/Search';
import { ResData } from '../types/interface';
import { api } from '../api/api';
import Loading from '../components/Loading';
import DetailedDataCard from '../components/DetailedCard.tsx';

const Main: React.FC = () => {
  const [data, setData] = useState<ResData[]>([]);
  const [detailedData, setdetailedData] = useState<ResData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchAnimals = async (value: string) => {
    setdetailedData(null);
    setLoading(true);
    setError(null);

    try {
      const response = value
        ? await api.findPeopleByName(value)
        : await api.getPeoples(1);

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      setData(value ? response : response.results);
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
    fetchAnimals(value);
  };

  const handleCard = (data: ResData) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
    setdetailedData(data);
  };

  const handleCloseDetailedCard = () => {
    setdetailedData(null);
  };

  const handleErrorButtonClick = () => {
    throw new Error('This is a test error');
  };

  useEffect(() => {
    fetchAnimals(localStorage.getItem('inputValue') ?? '');
  }, []);

  if (isError) {
    handleErrorButtonClick();
    return null;
  }

  return (
    <>
      <Search handleSearch={handleSearch} />
      <section className="container result-block">
        <Results
          data={data}
          handleCard={handleCard}
          handleCloseDetailedCard={handleCloseDetailedCard}
        />
        {detailedData && !loading && (
          <DetailedDataCard
            data={detailedData}
            handleCloseDetailedCard={handleCloseDetailedCard}
          />
        )}
      </section>
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
