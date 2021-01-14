import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from './asyncHandler.js';
import Employee from '../models/employeeModel.js';

dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not Authorized', 401));
  }

  // If there is a token, verify the logged in user
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = await Employee.findById(decoded._id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not Authorized', 401));
  }
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.employee.role)) {
    console.log(req.employee.role);
    return next(
      new ErrorResponse('Your role is not authorized for this action', 403)
    );
  }
  next();
};
