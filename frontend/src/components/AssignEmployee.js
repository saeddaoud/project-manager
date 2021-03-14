import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmployees } from '../redux/actions/employeeActions';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import {
  addEmployeeToTask,
  removeEmployeeFromTask,
} from '../redux/actions/taskActions';

const AssignEmployee = ({ setShowEmployeesList, task }) => {
  const dispatch = useDispatch();
  const { employees, error, loading } = useSelector(
    (state) => state.employeesList
  );
  // const { success: addEmployeeSuccess } = useSelector(
  //   (state) => state.taskEmployeeAdd
  // );
  // const { success: removeEmployeeSuccess } = useSelector(
  //   (state) => state.taskEmployeeRemove
  // );

  // console.log(task.employee, employees);

  useEffect(() => {
    dispatch(listEmployees());
  }, [dispatch]);

  return (
    <>
      {/* <BackDrop /> */}
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <div className=' employees-list-container'>
        <ul className='employees-list'>
          <div
            className='employees-list-container__close'
            onClick={() => setShowEmployeesList(false)}
          >
            <i className='far fa-times-circle'></i>
          </div>
          {employees &&
            employees.map(
              (employee) =>
                employee.role === 'employee' && (
                  <li className='employees-list__item flex' key={employee._id}>
                    <div className='name'>{employee.name}</div>
                    <button
                      className='btn'
                      onClick={() => {
                        task.employee.map((x) => x._id).includes(employee._id)
                          ? dispatch(
                              removeEmployeeFromTask({
                                taskId: task._id,
                                employeeToRemoveFromTask: employee._id,
                              })
                            )
                          : dispatch(
                              addEmployeeToTask({
                                taskId: task._id,
                                employeeToAddToTask: employee._id,
                              })
                            );
                        setShowEmployeesList(false);
                      }}
                    >
                      {task.employee.map((x) => x._id).includes(employee._id)
                        ? 'Remove'
                        : 'Assign'}
                    </button>
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
};

export default AssignEmployee;
