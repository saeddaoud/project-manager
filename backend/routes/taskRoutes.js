import express from 'express';
import {
  addTask,
  deleteTask,
  getTask,
} from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, authorize('manager'), addTask);
router
  .route('/:id')
  .delete(protect, authorize('manager'), deleteTask)
  .get(protect, authorize('supervisor', 'manager'), getTask);

export default router;
