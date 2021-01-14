import express from 'express';
import { createProject } from '../controllers/projectControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, authorize('manager'), createProject);

export default router;
