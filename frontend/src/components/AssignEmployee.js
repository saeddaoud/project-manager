import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmployees } from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';

const AssignEmployee = ({ setShowEmployeesList }) => {
  const dispatch = useDispatch();
  const { employees, error, loading } = useSelector(
    (state) => state.employeesList
  );

  useEffect(() => {
    dispatch(listEmployees());
  }, []);
  return (
    <>
      {/* <BackDrop /> */}
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className='employees-list-container'>
        <div
          className='employees-list-container__close'
          onClick={() => setShowEmployeesList(false)}
        >
          <i className='far fa-times-circle'></i>
        </div>
        <ul className='employees-list'>
          {employees &&
            employees.map(
              (employee) =>
                employee.role === 'employee' && (
                  <li className='employees-list__item flex' key={employee._id}>
                    <div className='name'>{employee.name}</div>
                    <button className='btn'>Assign</button>
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
};

export default AssignEmployee;
