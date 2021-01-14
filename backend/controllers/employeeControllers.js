import Employee from '../models/employeeModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

//@route            GET /api/v1/employees
//@desc             Get all employees
//@Access           Private/supervisors and manager
export const getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find({}).select('-password');
  res.status(200).json({
    sucess: true,
    data: employees,
  });
});
