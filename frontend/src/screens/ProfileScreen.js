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
import { projectsFetch } from '../redux/reducers/projectReducers';
import { fetchProjects } from '../redux/actions/projectActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  // States
  // const { users, loading, success, error } = useSelector(
  //   (state) => state.employeesList
  // );
  const { user } = useSelector((state) => state.meFetch);
  const { projects, loading, error, success } = useSelector(
    (state) => state.projectsFetch
  );

  // const clickHandler = () => {
  //   console.log('clicked');
  //   dispatch(listEmployees());
  // };

  useEffect(() => {
    // The if statement is to prevent fetching the logged in user everytime they go to their profile page, since the logged in user's info is already in the state
    if (!user) {
      dispatch(fetchMe());
    }

    dispatch(fetchProjects());
  }, [dispatch, user]);

  return (
    <div className='page profile-page'>
      <div className='container flex flex-jcc flex-fdc'>
        {/* <button className='btn m-2' onClick={clickHandler}>
          List Employees
        </button> */}
        {loading && <Spinner />}
        {error && <Message>{error}</Message>}
        {projects && (
          <div className='list'>
            <ul>
              {projects.map((project) => (
                <Link key={project._id} to={`/project/${project._id}`}>
                  <li>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
