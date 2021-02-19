import express from 'express';
import { addTask, deleteTask } from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, authorize('manager'), addTask);
router.route('/:id').delete(protect, authorize('manager'), deleteTask);

export default router;
