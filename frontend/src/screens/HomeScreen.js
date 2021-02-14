import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HomeScreen = () => {
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.employeeLogin);
  useEffect(() => {
    if (userInfo) {
      history.push('/profile/me');
    }
  }, [userInfo, history]);
  return (
    // <div className='page'>
      <div className='container flex flex-jcc '>
        <div className='card flex flex-jcsa flex-fdc'>
          <h2>Welcome to</h2>
          <h1>Project Manager</h1>
          <p>
            A web-based solution that allows you assign tasks to your employees,
            while tracking the progress they make on the projects you are
            working on!
          </p>
        </div>
      </div>
    // </div>
  );
};

export default HomeScreen;
