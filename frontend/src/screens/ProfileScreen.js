import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmployee } from '../redux/actions/employeeActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  return <div className='page profile-page'>My profile</div>;
};

export default ProfileScreen;
