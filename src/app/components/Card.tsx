import React from 'react';
import { CardProps } from '../types/interface';

const Card: React.FC<CardProps> = ({ data, handleCard }) => {
  return (
    <button
      id={data.url}
      className="answer-item"
      onClick={() => handleCard(data)}
    >
      <p>{data.name}</p>
      <p>Gender: {data.gender}</p>
    </button>
  );
};

export default Card;
