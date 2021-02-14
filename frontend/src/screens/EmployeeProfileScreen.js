import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { fetchEmployee } from '../redux/actions/employeeActions';

const EmployeeProfileScreen = ({ match }) => {
  const id = match.params.id;

  console.log(id);

  const dispatch = useDispatch();
  const { user, loading, success, error } = useSelector(
    (state) => state.employeeFetch
  );

  useEffect(() => {
    dispatch(fetchEmployee(id));
  }, [dispatch, id]);

  return (
    // <div className='page profile-page'>
      <div className='container'>
        {loading && <Spinner />}
        {error && <Message>{error}</Message>}
        {user && <h3>{user.name}</h3>}
      </div>
    // </div>
  );
};

export default EmployeeProfileScreen;
