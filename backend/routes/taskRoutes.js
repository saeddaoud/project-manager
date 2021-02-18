import express from 'express';
import { addTask } from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, authorize('manager'), addTask);

export default router;
