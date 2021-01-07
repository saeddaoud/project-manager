import asyncHandler from '../middleware/asyncHandler.js';
import Employee from '../models/employeeModel.js';

export const register = asyncHandler(async (req, res, next) => {
  Employee.create(req.body, (err, employee) => {
    if (err) {
      next(err);
    } else {
      const token = employee.getSignedJWTToken();
      res.status(200).json({
        success: true,
        token,
      });
    }
  });
});
