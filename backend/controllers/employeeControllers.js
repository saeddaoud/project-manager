import Employee from '../models/employeeModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import Task from '../models/taskModel.js';
import mongoose from 'mongoose';

//@route            GET /api/v1/employees
//@desc             Get all employees
//@Access           Private/supervisors and manager
export const getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find({}).select('-password');
  res.status(200).json({
    success: true,
    data: employees,
  });
});

//@route            GET /api/v1/employees/me
//@desc             Get logged in employee
//@Access           Private
export const getMe = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.employee._id).select(
    '-password'
  );
  res.status(200).json({
    success: true,
    data: employee,
  });
});

//@route            GET /api/v1/employees/:id
//@desc             Get an employee by id
//@Access           Private/manager or supervisor
export const getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).select('-password');
  res.status(200).json({
    success: true,
    data: employee,
  });
});

//@route            PUT /api/v1/employees/:id
//@desc             Update employee's info
//@Access           Private
export const updateEmployeeInfo = asyncHandler(async (req, res, next) => {
  const { role, name, email, password } = req.body;

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorResponse('Employee not found', 404));
  }

  if (
    employee._id.toString() !== req.employee._id.toString() &&
    req.employee.role !== 'manager'
  ) {
    return next(new ErrorResponse('This action is not allowed', 401));
  }

  employee.name = name || employee.name;
  employee.email = email || employee.email;
  employee.password = password || employee.password;

  if (role && req.employee.role !== 'manager') {
    return next(
      new ErrorResponse(
        "You don't have authorization to change thie employee's role",
        401
      )
    );
  } else {
    employee.role = role || employee.role;
  }

  await employee.save();

  // employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  res.status(200).json({
    success: true,
    date: employee,
  });
});

//@route            PUT /api/v1/employees/avatar
//@desc             Update employee's avatar
//@Access           Private
export const updateEmployeeAvatar = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  // const avatar = req.body;

  const employee = await Employee.findByIdAndUpdate(
    req.employee._id,
    req.body,
    { new: true, fields: '-password' }
  );

  // employee.avatar = avatar;

  // await employee.save();

  res.status(200).json({
    success: true,
    data: employee,
  });
});
