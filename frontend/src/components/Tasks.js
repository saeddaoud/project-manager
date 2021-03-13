import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/actions/taskActions';

const Tasks = ({ tasks }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  // console.log(projects);
  return (
    <ul className='tasks-list'>
      {tasks.map((task) => (
        // <Link to={`/project/${project._id}`} key={project._id}>
        <li key={task._id}>
          <div className='flex'>
            <div>{task.name}</div>
            {/* <div>{task.status}</div> */}

            <div className='action-btns flex flex-jcfe'>
              {user && user.role === 'manager' && (
                <div
                  className='action-btn action-btn__delete mx-1'
                  onClick={() => dispatch(deleteTask(task._id))}
                >
                  <i className='far fa-trash-alt'></i>
                </div>
              )}

              {/* <div className='action-btn action-btn__edit'>
                  <i className='far fa-edit'></i>
                </div> */}

              {user.role === 'employee' ? (
                <Link to={`/employee/task/${task._id}`}>
                  <div className='action-btn action-btn__link'>
                    <i className='fas fa-external-link-alt'></i>{' '}
                  </div>
                </Link>
              ) : (
                <Link to={`/task/${task._id}`}>
                  <div className='action-btn action-btn__link'>
                    <i className='fas fa-external-link-alt'></i>{' '}
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className='h-line'></div>
          <div className='flex'>
            <div>Status</div>
            <div>{task.status}</div>
          </div>
          <div className='h-line'></div>
          <div className='flex'>
            <div>Employee(s)</div>
            <div>{task.employee.map((x) => x.name).join(', ')}</div>
          </div>
        </li>
        // </Link>
      ))}
    </ul>
  );
};

export default Tasks;
