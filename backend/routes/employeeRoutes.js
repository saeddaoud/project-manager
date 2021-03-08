import express from 'express';

import {
  getEmployee,
  getEmployees,
  getEmployeeTasks,
  getMe,
  updateEmployeeAvatar,
  updateEmployeeInfo,
} from '../controllers/employeeControllers.js';
import taskRoutes from './taskRoutes.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use('/:employeeId/tasks', taskRoutes);

router
  .route('/')
  .get(protect, authorize('supervisor', 'manager'), getEmployees);

router.route('/me').get(protect, getMe);

router
  .route('/:id')
  .put(protect, updateEmployeeInfo)
  .get(protect, authorize('supervisor', 'manager'), getEmployee);

router.route('/avatar').post(protect, updateEmployeeAvatar);

router.route('/:employeeId/tasks').get(protect, getEmployeeTasks);

export default router;
