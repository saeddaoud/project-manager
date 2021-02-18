import ErrorResponse from '../utils/errorResponse.js';
import asyncHandlder from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import mongoose from 'mongoose';

/* ********
  This route is not necessary as we can populate the tasks when fetching a project by id.
// ******** */
//@route          GET /api/v1/projects/:projectId/tasks
//@decsription    retrieve all tasks belongs to project with id projectId
//@access         Private/manager and supervisor only
// export const getTasks = asyncHandlder(async (req, res, next) => {
//   let project = await Project.findById(req.params.projectId);

//   if (!project) {
//     return next(new ErrorResponse('Project not found', 404));
//   }

//   const tasks = await Task.find({ _id: { $in: project.tasks } });

//   res.status(200).json({
//     success: true,
//     data: tasks,
//   });
// });

//@route          PUT /api/v1/projects/:projectId/tasks
//@decsription    add task to the project with projectId
//@access         Private/manager only
export const addTask = asyncHandlder(async (req, res, next) => {
  let project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  //   Create an object of the new task including the name and description from req.body, and project field with the rpoject id
  const newTask = new Task({
    project: mongoose.Types.ObjectId(project._id),
    ...req.body,
  });

  const task = await newTask.save();

  project = await Project.findByIdAndUpdate(
    req.params.projectId,
    { $push: { tasks: mongoose.Types.ObjectId(task._id) } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: task,
  });
});
