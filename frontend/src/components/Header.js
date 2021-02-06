import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/employeeActions';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  return (
    <div className='header'>
      <nav className='nav'>
        <div className='container flex'>
          <div className='nav__logo'>
            <h4>Project M</h4>
          </div>
          <div className='nav__menu'>
            <ul className='menu__list flex'>
              {user ? (
                <li>
                  <Link to='/profile/me'>{user.name}</Link>
                </li>
              ) : (
                <li>
                  <Link to='/'>Home</Link>
                </li>
              )}
              <li>
                {user ? (
                  <Link to='/login' onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                ) : (
                  <Link to='/login'>Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
