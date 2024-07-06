
import React from 'react';
import './NotFoundPage.css'; // Import CSS file for styling
import unauthorized from '../assets/unauthorized.avif';
import './NotFoundPage.css';

const NotAuthorized = () => {
  return (
    <div className="not-found-container">
      <img className='image' height={"300px"} width={"400vh"} src={unauthorized} />
      <div className="not-found-content">
        <h1 className="not-found-heading">Unauthorized Access!</h1>
        <p className="not-found-text">Sorry, You are not authorized to view this page!</p>
      </div>
    </div>
  );
};

export default NotAuthorized;

