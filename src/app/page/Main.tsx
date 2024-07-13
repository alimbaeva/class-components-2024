import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Results from '../components/Results';
import Search from '../components/Search';
import { ResData } from '../types/interface';
import { api } from '../api/api';
import Loading from '../components/Loading';
import DetailedDataCard from '../components/DetailedCard.tsx';
import Pagination from '../components/Pagination.tsx';

const Main: React.FC = () => {
  const showData = 10;
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<ResData[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedData, setdetailedData] = useState<ResData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const fetchData = async (value: string, page = 1) => {
    setdetailedData(null);
    setLoading(true);
    setError(null);

    setIsSearchResult(!value ? false : true);

    try {
      const response = value
        ? await api.findPeopleByName(value)
        : await api.getPeoples(page);

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      setData(value ? response : response.results);
      setAllCount(!value ? response.count : response.length);
      setCurrentPage(value ? 1 : page);
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
    setIsSearchResult(false);
    fetchData(value);
    const queryParams = new URLSearchParams();
    console.log(queryParams);
    console.log(location.search);
    navigate(`/?${queryParams.toString()}`);
  };

  const handleCard = (data: ResData) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
    setdetailedData(data);
  };

  const handleCloseDetailedCard = () => {
    setdetailedData(null);
  };

  const handleSetPage = (page: number) => {
    if (isSearchResult) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
      fetchData('', page);
    }
  };

  const handleErrorButtonClick = () => {
    throw new Error('This is a test error');
  };

  useEffect(() => {
    fetchData(localStorage.getItem('inputValue') ?? '');
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
          data={
            isSearchResult
              ? data.slice(
                  showData * (currentPage - 1),
                  showData * currentPage + 1,
                )
              : data
          }
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
      <Pagination
        allCount={allCount}
        handleSetPage={handleSetPage}
        isSearchResult={isSearchResult}
      />
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
