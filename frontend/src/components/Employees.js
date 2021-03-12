import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/actions/taskActions';

const Employees = ({ employees }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.meFetch);
  // console.log(projects);
  return (
    <ul className='task-employees-list'>
      {employees.map((employee) => (
        // <Link to={`/project/${project._id}`} key={project._id}>
        <li key={employee._id}>
          <div className='flex'>
            <div>{employee.name}</div>
            <div className='img'>
              <img src={employee.avatar} alt='image' />
            </div>
            {/* <div>{task.status}</div> */}
            {/* {user && (user.role === 'manager' || user.role === 'supervisor') && ( */}
            {/* <div className='action-btns flex'> */}
            {/* <div
                  className='action-btn action-btn__delete'
                  onClick={() => dispatch(deleteTask(task._id))}
                >
                  <i className='far fa-trash-alt'></i>
                </div> */}

            {/* <div className='action-btn action-btn__edit'>
                  <i className='far fa-edit'></i>
                </div> */}

            {/* <Link to={`/admin/employee-details/${employee._id}`}>
                <div className='action-btn action-btn__link'>
                  <i className='fas fa-external-link-alt'></i>{' '}
                </div>
              </Link> */}
            {/* </div> */}
            {/* )
            } */}
          </div>
          {/* <div className='flex'>
            <div>Status</div>
            <div>Employee</div>
          </div> */}
        </li>
        // </Link>
      ))}
    </ul>
  );
};

export default Employees;
