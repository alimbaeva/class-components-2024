import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/page404.css';

const Page404: React.FC = () => {
  return (
    <section>
      <div className="container">
        <h1 className="title">This page does not exist</h1>

        <NavLink className="link-page" to={'/'}>
          Main page
        </NavLink>
      </div>
    </section>
  );
};

export default Page404;
