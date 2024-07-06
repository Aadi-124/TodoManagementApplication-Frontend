
import React from 'react';
import './NotFoundPage.css'; // Import CSS file for styling
import image404 from '../assets/404.png';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img className='image' height={"300px"} width={"400vh"} src={image404} />
      <div className="not-found-content">
        <h1 className="not-found-heading">404 - Page Not Found</h1>
        <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;











