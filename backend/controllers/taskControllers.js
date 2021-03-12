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
    {
      $push: { tasks: mongoose.Types.ObjectId(task._id) },
      $inc: { totalNoOfTasks: 1 },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: task,
  });
});

//@route          Get /api/v1/tasks
//@decsription    Get signed in employee's tasks
//@access         Private
export const getTasks = asyncHandlder(async (req, res, next) => {
  // console.log('get tasks');
  let employee = await Employee.findById(req.employee._id);

  if (!employee) {
    return next(new ErrorResponse('Employee not found', 404));
  }

  const status = req.query.status;
  const limit = req.query.limit && Number(req.query.limit);
  const keyword = req.query.keyword;

  // console.log(status, limit, keyword);
  // If a keyword is provided retrieve the projects whose name is matched. Otherwise if a status is provided filter documents based on status. Else, retrieve all projects.
  const query = keyword
    ? {
        $and: [
          { employee: employee._id },
          { name: { $regex: keyword, $options: 'i' } },
        ],
      }
    : status
    ? { $and: [{ employee: employee._id }, { status: status }] }
    : { employee: employee._id };

  // console.log(query);

  const tasks = limit
    ? await Task.find(query)
        .limit(limit)
        .populate('employee', 'name')
        .sort({ _id: -1 })
    : await Task.find(query).populate('employee', 'name').sort({ _id: -1 });

  // console.log(tasks);

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

  if (task.status === 'completed') {
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
      $inc: { totalNoOfTasks: -1 },
      $inc: { totalNoOfCompletedTasks: -1 },
    });
  } else {
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
      $inc: { totalNoOfTasks: -1 },
    });
  }

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
    .populate('employee', 'name avatar');

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

//@route          PUT /api/v1/tasks/:id/status
//@decsription    Update task's status by assigned employee
//@access         Private/assigned employee only
export const updateTaskStatus = asyncHandlder(async (req, res, next) => {
  const { status } = req.body;
  // console.log(status);
  const employee = await Employee.findById(req.employee._id);
  let task = await Task.findById(req.params.id);
  // console.log(task);
  const prevStatus = task.status;
  let project = await Project.findById(task.project);
  // Check if task exists
  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }
  // check if signed in employee is the assigned employee t the task
  if (!task.employee.includes(employee._id)) {
    return next(
      new ErrorResponse(
        'Not authorized. You are not an assigned employee for this task',
        401
      )
    );
  }

  if (prevStatus !== 'completed' && status === 'completed') {
    project = await Project.findByIdAndUpdate(
      project._id,
      { $inc: { totalNoOfCompletedTasks: 1 } },
      { new: true }
    );
  } else if (prevStatus === 'completed' && status !== 'completed') {
    project = await Project.findByIdAndUpdate(
      project._id,
      { $inc: { totalNoOfCompletedTasks: -1 } },
      { new: true }
    );
  }
  // console.log(project.totalNoOfTasks, project.totalNoOfCompletedTasks);
  if (project.totalNoOfTasks === project.totalNoOfCompletedTasks) {
    await Project.findByIdAndUpdate(
      project._id,
      { $set: { status: 'completed' } },
      { new: true }
    );
  }

  task = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: { status: status } },
    {
      new: true,
    }
  );

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

//@route            PUT /api/v1/tasks/:taskId/employee/add
//@desc             Add employee(s) to a task
//@Access           Private/Manager or Supervisor only
export const addEmployeeToTask = asyncHandlder(async (req, res, next) => {
  const { employeeToAddToTask } = req.body;

  let task = await Task.findById(req.params.taskId);
  let project = await Project.findById(task.project);
  const employee = await Employee.findById(employeeToAddToTask);

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  if (!employee) {
    return next(new ErrorResponse('Employee not found', 404));
  }

  if (task.employee.includes(employee._id)) {
    return next(
      new ErrorResponse('Employee already assigned to this task', 400)
    );
  }

  task = await Task.findByIdAndUpdate(
    task._id,
    {
      $push: { employee: mongoose.Types.ObjectId(employee._id) },
    },
    { new: true }
  );
  project = await Project.findByIdAndUpdate(
    project._id,
    {
      $push: { employees: mongoose.Types.ObjectId(employee._id) },
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

//@route            PUT /api/v1/tasks/:taskId/employee/remove
//@desc             Remove employee(s) from a task
//@Access           Private/Manager or Supervisor only
export const removeEmployeeFromTask = asyncHandlder(async (req, res, next) => {
  const { employeeToRemoveFromTask } = req.body;

  let task = await Task.findById(req.params.taskId);
  let project = await Project.findById(task.project);
  const employee = await Employee.findById(employeeToRemoveFromTask);

  if (!task) {
    return next(new ErrorResponse('Task not found', 404));
  }
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  if (!employee) {
    return next(new ErrorResponse('Employee not found', 404));
  }

  if (!task.employee.includes(employee._id)) {
    return next(
      new ErrorResponse(
        "Employee hasn't been assigned to this task to be removed",
        400
      )
    );
  }

  task = await Task.findByIdAndUpdate(
    task._id,
    {
      $pull: { employee: mongoose.Types.ObjectId(employee._id) },
    },
    { new: true }
  );
  project = await Project.findByIdAndUpdate(
    project._id,
    {
      $pull: { employees: mongoose.Types.ObjectId(employee._id) },
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
