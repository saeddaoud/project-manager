import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject } from '../redux/actions/projectActions';

import Projects from '../components/Projects';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { useHistory } from 'react-router-dom';

const ProjectsScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);

  const { projects, error, loading, success } = useSelector(
    (state) => state.projectsFetch
  );

  const [keyword1, setKeyword1] = useState('');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } else if (keyword !== '') {
      dispatch(fetchProjects({ keyword }));
      setKeyword('');
    } else if (status === 'all') {
      dispatch(fetchProjects());
    } else {
      dispatch(fetchProjects({ status }));
    }
  }, [keyword, status, dispatch]);

  const searchProjectsHandler = (e) => {
    e.preventDefault();
    setKeyword(keyword1);
    setKeyword1('');
  };

  return (
    <div className='container'>
      <div className='actions flex flex-aife flex-fdc my-1'>
        <div className='flex flex-aife' style={{ width: '100%' }}>
          <div className='search'>
            <form
              onSubmit={searchProjectsHandler}
              className='form flex flex-fdc flex-jcsa'
              style={{
                minHeight: '25px',
                width: '100%',
                border: 'none',
                padding: '0',
                boxShadow: 'none',
                borderRadius: '0',
                borderBottom: '1px solid black',
              }}
            >
              <div
                className='input-control'
                style={{
                  height: '50px',
                  marginBottom: '0',
                  width: '100%',
                }}
              >
                {/* <label>Keyword</label> */}
                <input
                  style={{ top: '15px', width: '100%' }}
                  type='text'
                  placeholder='Search Projects'
                  value={keyword1}
                  onChange={(e) => setKeyword1(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className='filter'>
            <select
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='active'>Active</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className='display-projects flex flex-aifs flex-fdc'>
        {projects && <Projects projects={projects} />}
      </div>
    </div>
  );
};

export default ProjectsScreen;
