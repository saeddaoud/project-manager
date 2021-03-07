import express from 'express';
import {
  addEmployeeToTask,
  addTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  removeEmployeeFromTask,
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
  .route('/:taskId/employee/add')
  .put(protect, authorize('supervisor', 'manager'), addEmployeeToTask);
router
  .route('/:taskId/employee/remove')
  .put(protect, authorize('supervisor', 'manager'), removeEmployeeFromTask);

export default router;
