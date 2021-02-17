import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EmployeesProjectsScreen = () => {
  const { user } = useSelector((state) => state.meFetch);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);
  return <div>Employees Projects</div>;
};

export default EmployeesProjectsScreen;
