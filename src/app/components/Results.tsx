import React, { Component } from 'react';
import { ResultsProps } from '../types/interface';

class Results extends Component<ResultsProps> {
  render(): React.ReactNode {
    const { data } = this.props;

    if (!data.length) {
      return (
        <h2 className="emty-message">
          Unfortunately, there is no data available for your request.
        </h2>
      );
    }

    return (
      <div className="search-block">
        <ul className="answer-block">
          {data.map((animal) => (
            <li key={animal.uid} className="answer-item">
              <p>{animal.name}</p>
              <p>Earth Animal: {animal.earthAnimal ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
