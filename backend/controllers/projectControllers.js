import Project from '../models/projectModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

//@route          GET /api/v1/projects
//@decsription    Get all projects
//@access         Private/manager only
export const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({});
  res.status(200).json({
    success: true,
    data: projects,
  });
});

//@route          GET /api/v1/projects/:id
//@decsription    Get project by id
//@access         Private/manager only
export const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  // Check if project found
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

//@route          POST /api/v1/projects
//@decsription    Create a new project
//@access         Private/manager only
export const createProject = asyncHandler(async (req, res, next) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    data: project,
  });
});
