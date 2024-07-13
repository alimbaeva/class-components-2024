import React, { useEffect } from 'react';
import { CardPropsDetail } from '../types/interface';
import { format } from 'date-fns';
import '../styles/detailedDataCard.css';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailedDataCard: React.FC<CardPropsDetail> = ({
  data,
  handleCloseDetailedCard,
}) => {
  const urlArr = data.url.split('/');
  const date = new Date(data.created);
  const formattedDate = format(date, 'dd.MM.yyyy HH:mm:ss');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname + location.search.split('&detail')[0];
    navigate(`${currentUrl}&detail=${urlArr[urlArr.length - 2]}`);
  }, []);

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
          <span>Skin color :</span> {data.skin_color}
        </p>
        <p>
          <span>Created :</span> {formattedDate}
        </p>
      </div>
    </section>
  );
};

export default DetailedDataCard;
