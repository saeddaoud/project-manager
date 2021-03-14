import React from 'react';

const Employees = ({ employees }) => {
  return (
    <ul className='task-employees-list'>
      {employees.map((employee) => (
        <li key={employee._id}>
          <div className='flex'>
            <div>{employee.name}</div>
            <div className='img'>
              <img src={employee.avatar} alt={employee.name} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Employees;
