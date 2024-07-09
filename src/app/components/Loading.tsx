import React, { Component, ReactNode } from 'react';
import '../styles/loadung.css';

class Loading extends Component {
  render(): ReactNode {
    return (
      <section className="loader">
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
  }
}

export default Loading;
