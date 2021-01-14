import express from 'express';

import { getEmployees } from '../controllers/employeeControllers.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('supervisor', 'manager'), getEmployees);

export default router;
