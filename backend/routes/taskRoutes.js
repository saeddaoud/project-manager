import express from 'express';
import {
  addEmployeeToTask,
  addTask,
  deleteTask,
  getTask,
  // getTasks,
  updateTask,
  removeEmployeeFromTask,
  getTasks,
  updateTaskStatus,
} from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  // .post(protect, authorize('manager'), addTask)
  .get(protect, getTasks);

router
  .route('/:id')
  .delete(protect, authorize('manager'), deleteTask)
  .put(protect, authorize('manager'), updateTask)
  .get(protect, getTask);

router.route('/:id/status').put(protect, updateTaskStatus);

router
  .route('/:taskId/employee/add')
  .put(protect, authorize('supervisor', 'manager'), addEmployeeToTask);
router
  .route('/:taskId/employee/remove')
  .put(protect, authorize('supervisor', 'manager'), removeEmployeeFromTask);

export default router;
