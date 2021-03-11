import express from 'express';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getTasks,
  updateProject,
} from '../controllers/projectControllers.js';
import { addTask } from '../controllers/taskControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

// router.use('/:projectId/tasks', taskRoutes);

router
  .route('/')
  .post(protect, authorize('manager'), createProject)
  .get(protect, authorize('supervisor', 'manager'), getProjects);

// router
//   .route('/active')
//   .get(protect, authorize('supervisor', 'manager'), getActiveProjects);

router
  .route('/:id')
  .get(protect, authorize('supervisor', 'manager'), getProject)
  .delete(protect, authorize('manager'), deleteProject)
  .put(protect, authorize('manager'), updateProject);

router
  .route('/:projectId/tasks')
  .get(protect, authorize('supervisor', 'manager'), getTasks)
  .post(protect, authorize('manager'), addTask);

export default router;
