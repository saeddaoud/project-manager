import express from 'express';
import {
  createProject,
  getProject,
  getProjects,
} from '../controllers/projectControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('manager'), createProject)
  .get(protect, authorize('manager'), getProjects);

router.route('/:id').get(protect, authorize('manager'), getProject);

export default router;
