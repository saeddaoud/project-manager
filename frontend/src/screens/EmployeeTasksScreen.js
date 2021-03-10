import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { fetchMyTasks } from '../redux/actions/taskActions';
import Tasks from '../components/Tasks';
// import BackDrop from '../components/BackDrop';

const EmployeeTasksScreen = () => {
  // const history = useHistory();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  // console.log(user);
  const { tasks, error, loading } = useSelector((state) => state.myTasksFetch);

  // console.log(projects);

  const [keyword1, setKeyword1] = useState('');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (keyword !== '') {
      dispatch(fetchMyTasks({ keyword }));
      setKeyword('');
    } else if (status === 'all') {
      dispatch(fetchMyTasks({}));
    } else {
      dispatch(fetchMyTasks({ status }));
    }
  }, [keyword, status, dispatch]);

  const searchTaskssHandler = (e) => {
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
              onSubmit={searchTaskssHandler}
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
              {/* <div
                className='input-control'
                style={{
                  height: '30px',
                  marginBottom: '0',
                  width: '100%',
                }}
              > */}
              {/* <label>Keyword</label> */}
              <input
                style={{ top: '15px', width: '100%' }}
                type='text'
                placeholder='Search Tasks'
                value={keyword1}
                onChange={(e) => setKeyword1(e.target.value)}
              />
              {/* </div> */}
            </form>
          </div>
          <div className='filter'>
            <select
              name='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='not started'>Not Started</option>
              <option value='in progress'>In Progress</option>
              <option value='aborted'>Aborted</option>
              <option value='paused'>Paused</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className='display-projects flex flex-aifs flex-fdc'>
        {tasks && <Tasks tasks={tasks} />}
      </div>
    </div>
  );
};

export default EmployeeTasksScreen;
