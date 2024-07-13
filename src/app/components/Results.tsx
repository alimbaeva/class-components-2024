import React from 'react';
import { ResultsProps } from '../types/interface';
import Card from './Card';

const Results: React.FC<ResultsProps> = ({
  data,
  handleCard,
  handleCloseDetailedCard,
}) => {
  if (!data.length) {
    return (
      <h2 className="emty-message">
        Unfortunately, there is no data available for your request.
      </h2>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCloseDetailedCard();
    }
  };

  const onClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLHtmlElement).classList.contains('search-block')) {
      handleCloseDetailedCard();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="search-block"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      onTouchStart={handleCloseDetailedCard} // для поддержки сенсорных экранов
      onMouseDown={(event) => event.preventDefault()} // предотвращает фокусировку при щелчке мышью
    >
      <div className="answer-block">
        {data.map((people) => (
          <Card key={people.url} data={people} handleCard={handleCard} />
        ))}
      </div>
    </div>
  );
};

export default Results;
