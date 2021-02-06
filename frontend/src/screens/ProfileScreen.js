import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, listEmployees } from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';

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
    dispatch(fetchEmployee());
  }, [dispatch]);

  return (
    <div className='page profile-page'>
      <button className='btn m-2' onClick={clickHandler}>
        List Employees
      </button>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className='list'>
        <ul>
          {users && users.map((user) => <li key={user._id}>{user.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
