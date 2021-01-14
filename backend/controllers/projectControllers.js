import Project from '../models/projectModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

//@route          POST /api/v1/projects
//@decsription    Create a new project
//@access         Private/manager only
export const createProject = asyncHandler(async (req, res, next) => {
  res.send('Project Created');
});
