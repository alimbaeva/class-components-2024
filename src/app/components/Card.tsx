import React from 'react';
import { CardProps } from '../types/interface';

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <li id={data.url} className="answer-item">
      <p>{data.name}</p>
      <p>Gender : {data.gender}</p>
    </li>
  );
};

export default Card;
