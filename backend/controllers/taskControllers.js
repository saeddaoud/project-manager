import ErrorResponse from '../utils/errorResponse.js';
import asyncHandlder from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import Employee from '../models/employeeModel.js';
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

//@route          POST /api/v1/projects/:projectId/tasks
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

//@route          GET /api/v1/projects/:projectId/tasks
//@decsription    Get all task of a project
//@access         Private/manager only
export const getTasks = asyncHandlder(async (req, res, next) => {
  let project = await Project.findById(req.params.projectId);

  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  const tasks = await Task.find({ project: project._id }).populate(
    'employee',
    'name'
  );

  res.status(200).json({
    success: true,
    data: tasks,
  });
});

//@route          DELETE /api/v1/tasks/:id
//@decsription    add task to the project with projectId
//@access         Private/manager only
export const deleteTask = asyncHandlder(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }

  const project = await Project.findByIdAndUpdate(task.project, {
    $pull: { tasks: task._id },
  });

  // console.log(project);

  await task.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@route          GET /api/v1/tasks/:id
//@decsription    Retrieve a task by its id
//@access         Private/manager and supervisor only
export const getTask = asyncHandlder(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate('project', 'name')
    .populate('employee', 'name');

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }

  // const project = await Project.findByIdAndUpdate(task.project, {
  //   $pull: { tasks: task._id },
  // });

  // console.log(project);

  // await task.remove();

  res.status(200).json({
    success: true,
    data: task,
  });
});

//@route          PUT /api/v1/tasks/:id
//@decsription    Update a task
//@access         Private/manager only
export const updateTask = asyncHandlder(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }

  // const project = await Project.findByIdAndUpdate(task.project, {
  //   $pull: { tasks: task._id },
  // });

  // console.log(project);

  // await task.remove();

  res.status(200).json({
    success: true,
    data: task,
  });
});

//@route            PUT /api/v1/tasks/:taskId/employees/:employeeId
//@desc             Add employee(s) to a task
//@Access           Private/Manager or Supervisor only
export const addEmployeeToTask = asyncHandlder(async (req, res, next) => {
  // console.log(req.body);
  // const avatar = req.body;

  let task = await Task.findById(req.params.taskId);

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }

  const employee = await Employee.findById(req.params.employeeId);

  if (!employee) {
    return next(new ErrorResponse('Employee not found', 404));
  }

  task = await Task.findByIdAndUpdate(
    task._id,
    {
      $push: { employee: mongoose.Types.ObjectId(employee._id) },
    },
    { new: true }
  );

  // employee.avatar = avatar;

  // await employee.save();

  res.status(200).json({
    success: true,
    data: task,
  });
});
