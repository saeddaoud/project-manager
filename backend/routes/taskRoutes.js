import express from 'express';
import {
  addEmployeeToTask,
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, authorize('manager'), addTask)
  .get(protect, authorize('supervisor', 'manager'), getTasks);
router
  .route('/:id')
  .delete(protect, authorize('manager'), deleteTask)
  .put(protect, authorize('manager'), updateTask)
  .get(protect, authorize('supervisor', 'manager'), getTask);
router
  .route('/:taskId/employees/:employeeId')
  .put(protect, authorize('supervisor', 'manager'), addEmployeeToTask);

export default router;
