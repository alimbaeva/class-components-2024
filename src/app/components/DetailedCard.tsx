import React from 'react';
import { CardPropsDetail } from '../types/interface';
import '../styles/detailedDataCard.css';

const DetailedDataCard: React.FC<CardPropsDetail> = ({
  data,
  handleCloseDetailedCard,
}) => {
  const urlArr = data.url.split('/');

  return (
    <section className="detailed-data-card">
      <button
        className="close-detailed"
        onClick={() => handleCloseDetailedCard()}
      >
        X
      </button>
      <div>
        <img
          className="image-person"
          src={`https://starwars-visualguide.com/assets/img/characters/${urlArr[urlArr.length - 2]}.jpg`}
          alt="aa"
        />
      </div>
      <div className="info-block">
        <h3>{data.name}</h3>
        <p>
          <span>Gender :</span> {data.gender}
        </p>
        <p>
          <span>Hair color :</span> {data.hair_color}
        </p>
        <p>
          <span>Height :</span> {data.height}
        </p>
        <p>
          <span>Home world :</span> {data.homeworld}
        </p>
        <p>
          <span>Skin color :</span> {data.skin_color}
        </p>
        <p>
          <span>Created :</span> {data.created}
        </p>
      </div>
    </section>
  );
};

export default DetailedDataCard;
