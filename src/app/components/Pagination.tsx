import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pagination.css';
import { useTheme } from './ThemeProvider';

interface PropsPagination {
  allCount: number;
  handleSetPage: (page: number) => void;
  isSearchResult: boolean;
}

const Pagination: React.FC<PropsPagination> = ({
  allCount,
  handleSetPage,
  isSearchResult,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allCount / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    let currentUrl = '';
    if (location && location.search && location.search.includes('?detail')) {
      currentUrl = location.pathname + location.search.split('?detail')[0];
    } else if (
      location &&
      location.search &&
      location.search.split('?page').length >= 2
    ) {
      currentUrl = location.pathname + location.search.split('?page')[0];
    } else if (location && location.search) {
      currentUrl = location.pathname + location.search.split('&')[0];
    }

    navigate(`${currentUrl}${currentUrl.length <= 1 ? '?' : '&'}page=${page}`);
    handleSetPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [isSearchResult]);

  return (
    <section
      className="container pagination"
      data-testid="app-content"
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      <div
        className={
          theme === 'light'
            ? 'isLight pagination-block'
            : 'isDark pagination-block'
        }
      >
        <button
          className={currentPage === 1 ? 'disabled btn-prev' : 'btn-prev'}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          prev
        </button>
        {pages.map((el) => {
          return (
            <button
              key={el}
              className={currentPage === el ? 'activ btn-item' : 'btn-item'}
              onClick={() => handlePageChange(el)}
            >
              {el}
            </button>
          );
        })}
        <button
          className={
            currentPage === totalPages ? 'disabled btn-next' : 'btn-next'
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
