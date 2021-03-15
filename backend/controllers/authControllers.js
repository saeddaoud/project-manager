import normalize from 'normalize-url';
import gravatar from 'gravatar';

import asyncHandler from '../middleware/asyncHandler.js';
import Employee from '../models/employeeModel.js';
import ErrorResponse from '../utils/errorResponse.js';

//@desc       Register a user
//@route      POST /api/v1/auth/register
//@access     Public
export const register = asyncHandler(async (req, res, next) => {
  // Check if the entered email is already used
  let employee = await Employee.findOne({ email: req.body.email });
  if (employee) {
    return next(new ErrorResponse('Email already exists', 400));
  }
  const avatar = '/imgs/default.png';
  // const avatar = normalize(
  //   gravatar.url(req.body.email, {
  //     s: '200',
  //     r: 'pg',
  //     d: 'mm',
  //   }),
  //   { forceHttps: true }
  // );
  // Create a new user with the enetered data and return a token
  employee = await Employee.create({ ...req.body, avatar });
  const token = employee.getSignedJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});

//@desc       login a user
//@route      POST /api/v1/auth/login
//@access     Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if both the email and password were provided
  if (!email || !password) {
    return next(
      new ErrorResponse('Email and password combination is required', 400)
    );
  }
  // Find the employee with the provided email
  const employee = await Employee.findOne({ email });
  // Check if the entered email is associated with a user in the database
  if (!employee) {
    return next(new ErrorResponse('Invalid Credentials', 400));
  }
  // Check if the entered password matches that associated with the employee's password in the databse
  if (!(await employee.matchPassword(password))) {
    return next(new ErrorResponse('Invalid Credentials', 400));
  }
  // Return a token
  const token = employee.getSignedJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
