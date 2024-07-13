import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pagination.css';

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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allCount / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const pageUrl = page === 1 ? '' : `?page=${page}`;
    navigate(`${pageUrl}`);
    handleSetPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [isSearchResult]);

  return (
    <section className="container pagination">
      <div className="pagination-block">
        <button
          className="btn-prev"
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
          className="btn-next"
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
