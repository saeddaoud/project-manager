import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTask, updateTaskStatus } from '../redux/actions/taskActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

const EmployeeTaskScreen = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState('');

  // console.log(status);

  const { task, loading, error } = useSelector((state) => state.taskFetch);
  const { error: taskStatusUpdateError } = useSelector(
    (state) => state.taskStatusUpdate
  );

  const { id } = useParams();

  // console.log(id, task, status);

  useEffect(() => {
    if (task && status) {
      dispatch(updateTaskStatus({ taskId: task._id, status }));
    }
  }, [status, dispatch, task]);

  useEffect(() => {
    if (task && task.status !== 'status') {
      setStatus(task.status);
    }
  }, [task]);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [dispatch, id]);
  return (
    <div className='container'>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <h3 className='title text-center'>Task's Details</h3>
      <div className='h-line'></div>
      <div className='employee-project-task-details'>
        {task && (
          <>
            <div className='project-details'>
              <div className='employee-project-task-details-item project-details__name flex'>
                <div>Project Name</div>
                <div>{task.project.name}</div>
              </div>
            </div>
            <div className='h-line'></div>
            <div className='task-details'>
              <div className='employee-project-task-details-item task-details__name flex'>
                <div>Task's Name</div>
                <div>{task.name}</div>
              </div>
              <div className='h-line'></div>
              <div className='employee-project-task-details-item task-details__description'>
                <h3>Task's Description</h3>
                <p style={{ textAlign: 'left' }}>{task.description}</p>
              </div>
              <div className='h-line'></div>
              <div className='employee-project-task-details-item task-details__status flex flex-fdc'>
                <div className='task-status__error'>
                  {taskStatusUpdateError && (
                    <Message>{taskStatusUpdateError}</Message>
                  )}
                </div>
                <div className='task-status__info flex'>
                  <div>Task's Status</div>
                  <div>
                    <select
                      name='status'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='not started'>Not Started</option>
                      <option value='in progress'>In Progress</option>
                      <option value='aborted'>Aborted</option>
                      <option value='paused'>Paused</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='h-line'></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskScreen;
