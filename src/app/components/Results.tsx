import React from 'react';
import { ResultsProps } from '../types/interface';
import Card from './Card';

const Results: React.FC<ResultsProps> = ({ data }) => {
  if (!data.length) {
    return (
      <h2 className="emty-message">
        Unfortunately, there is no data available for your request.
      </h2>
    );
  }

  return (
    <div className="container search-block">
      <ul className="answer-block">
        {data.map((people) => (
          <Card key={people.url} data={people} />
        ))}
      </ul>
    </div>
  );
};

export default Results;
