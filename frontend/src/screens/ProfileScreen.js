import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchMe, updateAvatar } from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { fetchProjects } from '../redux/actions/projectActions';
import Projects from '../components/Projects';
import { fetchMyTasks } from '../redux/actions/taskActions';
import Tasks from '../components/Tasks';

const ProfileScreen = () => {
  const [hidden, setHidden] = useState(true);

  const { user, loading: userLoading, error: userError } = useSelector(
    (state) => state.meFetch
  );
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useSelector((state) => state.projectsFetch);
  const { tasks } = useSelector((state) => state.myTasksFetch);

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

    if (user && user.role !== 'employee') {
      dispatch(fetchProjects({ limit: '3' }));
      // dispatch(fetchProjects());
    }

    if (user && user.role === 'employee') {
      dispatch(fetchMyTasks({ limit: '3' }));
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
    // <div className='page profile-page'>
    <div className='container flex flex-jcc flex-aifs'>
      {/* <button className='btn m-2' onClick={clickHandler}>
          List Employees
        </button> */}
      {(userLoading || projectsLoading) && <Spinner />}
      {userError && <Message>{userError}</Message>}
      {projectsError && <Message>{projectsError}</Message>}
      {!userLoading && !projectsLoading && user && (
        <div className='display flex flex-fdc my-1'>
          <div className='display__image'>
            <div
              className='image-upload my-1'
              onMouseEnter={() => setHidden(false)}
              onMouseLeave={() => setHidden(true)}
            >
              <img src={avatar} alt='avatar' />
              <form className={hidden ? 'hidden' : 'shown'}>
                <label htmlFor='file-input'>
                  <div>
                    <div>Update</div>
                  </div>
                </label>

                <input
                  id='file-input'
                  type='file'
                  onChange={handleAvatarUpload}
                />
              </form>
            </div>
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
          <div className='recent '>
            {user && user.role !== 'employee' ? (
              <div className='recent-projects my-1'>
                <h1>Recent Projects</h1>
              </div>
            ) : (
              <div className='recent-tasks my-1'>
                <h1>Recent Tasks</h1>
              </div>
            )}
            {user.role !== 'employee' && projects && (
              <Projects projects={projects} />
            )}
            {user.role === 'employee' && tasks && <Tasks tasks={tasks} />}
          </div>
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
    // </div>
  );
};

export default ProfileScreen;
