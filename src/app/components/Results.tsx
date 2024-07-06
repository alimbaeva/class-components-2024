import React, { Component } from 'react';
import { ResultsProps } from '../types/interface';

class Results extends Component<ResultsProps> {
  render(): React.ReactNode {
    const { data } = this.props;

    return (
      <div>
        <ul>
          {data.map((animal) => (
            <li key={animal.uid}>
              {animal.name} - Earth Animal: {animal.earthAnimal ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
