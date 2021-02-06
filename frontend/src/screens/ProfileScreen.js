import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployee,
  listEmployees,
  fetchMe,
} from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { users, loading, success, error } = useSelector(
    (state) => state.employeesList
  );

  const clickHandler = () => {
    console.log('clicked');
    dispatch(listEmployees());
  };

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className='page profile-page'>
      <div className='container'>
        <button className='btn m-2' onClick={clickHandler}>
          List Employees
        </button>
        {loading && <Spinner />}
        {error && <Message>{error}</Message>}
        <div className='list'>
          <ul>
            {users &&
              users.map((user) => (
                <Link key={user._id} to={`/profile/${user._id}`}>
                  <li>
                    {user.name} {user.email}
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
