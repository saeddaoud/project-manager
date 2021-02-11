import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchEmployee,
  listEmployees,
  fetchMe,
  updateAvatar,
} from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { projectsFetch } from '../redux/reducers/projectReducers';
import { fetchProjects } from '../redux/actions/projectActions';

const ProfileScreen = () => {
  const { user, loading, error } = useSelector((state) => state.meFetch);

  // console.log(user, loading);

  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  // States
  // const { users, loading, success, error } = useSelector(
  //   (state) => state.employeesList
  // );
  // const { projects, loading, error, success } = useSelector(
  //   (state) => state.projectsFetch
  // );

  // const clickHandler = () => {
  //   console.log('clicked');
  //   dispatch(listEmployees());
  // };

  useEffect(() => {
    // The if statement is to prevent fetching the logged in user everytime they go to their profile page, since the logged in user's info is already in the state
    if (!user) {
      dispatch(fetchMe());
    }
    if (user) {
      setAvatar(user.avatar);
    }

    // dispatch(fetchProjects());
  }, [dispatch, user]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-date',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);
      // console.log(data);
      setAvatar(data);
      setUploading(false);
      dispatch(updateAvatar(data));
    } catch (error) {
      console.error(error.message);
      setUploading(false);
    }
  };
  return (
    <div className='page profile-page'>
      <div className='container flex flex-jcc flex-aifs'>
        {/* <button className='btn m-2' onClick={clickHandler}>
          List Employees
        </button> */}
        {loading && <Spinner />}
        {error && <Message>{error}</Message>}
        {user && (
          <div className='display flex flex-fdc my-1'>
            <div className='display__image'>
              <form>
                <div className='image-upload my-1'>
                  <label htmlFor='file-input'>
                    <img src={avatar} />
                  </label>

                  <input
                    id='file-input'
                    type='file'
                    onChange={handleAvatarUpload}
                  />
                </div>
              </form>
            </div>
            <div className='h-line'></div>
            <div className='display__body'>
              <div className='my-1'>
                <h4>
                  Username : <span>{user.name}</span>
                </h4>
                <h4>
                  Email : <span>{user.email}</span>
                </h4>
              </div>
            </div>
            <div className='h-line'></div>
            {user && user.role !== 'employee' ? (
              <div className='recent-projects my-1'>
                <h1>Recent Projects</h1>
              </div>
            ) : (
              <div className='recent-tasks my-1'>
                <h1>Recent Tasks</h1>
              </div>
            )}
          </div>
        )}
        {/* {projects && (
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
        )} */}
      </div>
    </div>
  );
};

export default ProfileScreen;
