import React from 'react';
import '../styles/loadung.css';

const Loading = () => {
  return (
    <section data-testid="loading" className="loader">
      <div className="loader-inner-block">
        <div className="loader-block">
          <div className="item1"></div>
          <div className="item2"></div>
          <div className="item3"></div>
          <div className="item4"></div>
          <div className="item5"></div>
          <div className="item6"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
