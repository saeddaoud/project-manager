import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/employeeActions';

const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  return (
    <div className='header'>
      <div className='container '>
        <nav className='nav flex'>
          <div className='nav__logo'>
            <h4>Project M</h4>
          </div>
          <div className='nav__menu'>
            <ul className='menu__list flex'>
              {user ? (
                <li>
                  <Link to='/profile/me'>Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to='/' className='flex'>
                    <div>Home</div>
                  </Link>
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
          <div className='side-nav'>
            <div
              className={
                !show
                  ? 'humberger flex flex-fdc'
                  : 'humberger toggle flex flex-fdc'
              }
              onClick={() => setShow(!show)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={show ? 'side-nav__menu show' : 'side-nav__menu'}>
              <ul className='menu__list flex flex-fdc my-2'>
                {user ? (
                  <li>
                    <Link to='/profile/me' onClick={() => setShow(false)}>
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to='/' onClick={() => setShow(false)}>
                      Home
                    </Link>
                  </li>
                )}
                <li>
                  {user ? (
                    <Link
                      to='/login'
                      onClick={() => {
                        dispatch(logout());
                        setShow(false);
                      }}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link to='/login' onClick={() => setShow(false)}>
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
