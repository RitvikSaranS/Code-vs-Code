import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page / Profile</h1>
      <p>This is the home page ladies and gentleman</p>
      <ul>
        <li><Link to={'/competition'}>I want to compete</Link></li>
        <li><Link to={'/collaboration'}>I want to collaborate</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;
