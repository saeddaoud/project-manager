import Project from '../models/projectModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

//@route          GET /api/v1/projects
//@decsription    Get all projects
//@access         Private/manager and supervisor only
export const getProjects = asyncHandler(async (req, res, next) => {
  const status = req.query.status;
  const limit = req.query.limit && Number(req.query.limit);
  const keyword = req.query.keyword;
  // If a keyword is provided retrieve the projects whose name is matched. Otherwise if a status is provided filter documents based on status. Else, retrieve all projects.
  const query = keyword
    ? { name: { $regex: keyword, $options: 'i' } }
    : status
    ? { status: status }
    : {};
  // console.log(query);
  const projects = limit
    ? await Project.find(query).sort({ _id: -1 }).limit(limit)
    : await Project.find(query).sort({ _id: -1 });

  res.status(200).json({
    success: true,
    data: projects,
  });
});

// //@route          GET /api/v1/projects/active?limit=x
// //@decsription    Get the last x active projects
// //@access         Private/manager and supervisor only
// export const getActiveProjects = asyncHandler(async (req, res, next) => {
//   const limit = Number(req.query.limit);

//   const projects = await Project.find({ status: 'active' })
//     .sort({ _id: -1 })
//     .limit(limit);

//   res.status(200).json({
//     success: true,
//     data: projects,
//   });
// });

//@route          GET /api/v1/projects/:id
//@decsription    Get project by id
//@access         Private/manager and supervisor only
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

//@route          PUT /api/v1/projects/:id
//@decsription    Update project's details
//@access         Private/manager only
export const updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json({
    success: true,
    data: project,
  });
});

//@route          DELETE /api/v1/projects/:id
//@decsription    Delete a project
//@access         Private/manager only
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  await project.remove();

  res.status(201).json({
    success: true,
    data: {},
  });
});
