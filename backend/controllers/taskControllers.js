import ErrorResponse from '../utils/errorResponse.js';
import asyncHandlder from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import mongoose from 'mongoose';

//@route          PUT /api/v1/projects/:projectId/tasks
//@decsription    add task to the project with id
//@access         Private/manager only
export const addTask = asyncHandlder(async (req, res, next) => {
  let project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  //   Create an object of the new task including the name and description from req.body, and project field with the rpoject id
  const newTask = new Task({
    project: project._id,
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
