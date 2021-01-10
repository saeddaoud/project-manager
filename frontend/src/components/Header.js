import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <nav className='nav'>
        <div className='nav__logo'>
          <h4>Project M</h4>
        </div>
        <div className='nav__menu'>
          <ul className='menu__list'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
