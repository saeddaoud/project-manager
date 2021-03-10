import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchTask,
  updateTask,
  updateTaskStatus,
} from '../redux/actions/taskActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

const EmployeeTaskScreen = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState('');

  console.log(status);

  const { task, loading, error } = useSelector((state) => state.taskFetch);
  const { error: taskStatusUpdateError } = useSelector(
    (state) => state.taskStatusUpdate
  );

  const { id } = useParams();

  useEffect(() => {
    if (task && status !== '') {
      dispatch(updateTaskStatus({ taskId: task._id, status }));
    }
  }, [status]);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  useEffect(() => {
    dispatch(fetchTask(id));
  }, []);
  return (
    <div className='container'>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <h1 className='title my-1 text-center'>Task's Details</h1>
      <div className='h-line'></div>
      <div className='employee-project-task-details'>
        {task && (
          <>
            <div className='project-details'>
              <div className='project-details__name flex'>
                <div>Project Name</div>
                <div>{task.project.name}</div>
              </div>
            </div>
            <div className='h-line'></div>
            <div className='task-details'>
              <div className='task-details__name flex'>
                <div>Task's Name</div>
                <div>{task.name}</div>
              </div>
              <div className='h-line'></div>
              <div className='task-details__description'>
                <h3>Task's Description</h3>
                <p style={{ textAlign: 'left' }}>{task.description}</p>
              </div>
              <div className='h-line'></div>
              <div className='task-details__status flex'>
                {taskStatusUpdateError && (
                  <Message>{taskStatusUpdateError}</Message>
                )}
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
              <div className='h-line'></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskScreen;
