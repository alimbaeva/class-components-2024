import React from 'react';
import { ResultsProps } from '../types/interface';

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
          <li key={people.url} id={people.url} className="answer-item">
            <p>{people.name}</p>
            <p>Gender : {people.gender ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
