import express from 'express';

import {
  getEmployee,
  getEmployees,
  getMe,
  updateEmployeeInfo,
} from '../controllers/employeeControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('supervisor', 'manager'), getEmployees);

router.route('/me').get(protect, getMe);

router
  .route('/:id')
  .put(protect, updateEmployeeInfo)
  .get(protect, authorize('supervisor', 'manager'), getEmployee);

export default router;
