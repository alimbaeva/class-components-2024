import React, { Component } from 'react';
import { ResultsProps } from '../types/interface';

class Results extends Component<ResultsProps> {
  render(): React.ReactNode {
    const { data } = this.props;
    console.log(data);

    return (
      <div className="search-block">
        <ul className="answer-block">
          {data.map((animal) => (
            <li key={animal.uid} className="answer-item">
              {animal.name} - Earth Animal: {animal.earthAnimal ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
