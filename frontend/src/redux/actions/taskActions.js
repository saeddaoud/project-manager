import axios from 'axios';

import {
  MY_TASKS_FETCH_FAIL,
  MY_TASKS_FETCH_REQUEST,
  MY_TASKS_FETCH_SUCCESS,
  TASKS_FETCH_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  TASK_ADD_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_EMPLOYEE_ADD_FAIL,
  TASK_EMPLOYEE_ADD_REQUEST,
  TASK_EMPLOYEE_ADD_SUCCESS,
  TASK_EMPLOYEE_REMOVE_FAIL,
  TASK_EMPLOYEE_REMOVE_REQUEST,
  TASK_EMPLOYEE_REMOVE_SUCCESS,
  TASK_FETCH_FAIL,
  TASK_FETCH_REQUEST,
  TASK_FETCH_SUCCESS,
  TASK_STATUS_UPDATE_FAIL,
  TASK_STATUS_UPDATE_REQUEST,
  TASK_STATUS_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
} from '../constants/taskConstants';

export const addTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_ADD_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.post(
      `/api/v1/projects/${task.project}/tasks`,
      task,
      config
    );

    let tasks = getState().tasksFetch.tasks;

    if (tasks) {
      tasks.unshift(data.data);
      dispatch({
        type: TASKS_FETCH_SUCCESS,
        payload: { success: true, data: tasks },
      });
    }

    // console.log(tasks, data);

    dispatch({
      type: TASK_ADD_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_ADD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const updateTask = (task) => async (dispatch, getState) => {
  const { taskId, ...taskBody } = task;
  // console.log(taskId, taskBody);
  try {
    dispatch({
      type: TASK_UPDATE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/tasks/${taskId}`,
      taskBody,
      config
    );

    // let project = getState().projectFetch.project;

    // project.tasks = project.tasks.map((xtask) => {
    //   console.log(xtask._id.toString(), taskId.toString());
    //   return xtask._id.toString() === taskId.toString() ? data.data : xtask;
    // });

    // console.log(project);

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    // dispatch({
    //   type: TASK_FETCH_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const updateTaskStatus = ({ taskId, status }) => async (
  dispatch,
  getState
) => {
  // const { taskId, ...taskBody } = task;
  // console.log(taskId, status);
  try {
    dispatch({
      type: TASK_STATUS_UPDATE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/tasks/${taskId}/status`,
      { status },
      config
    );

    // console.log(data);

    // let project = getState().projectFetch.project;

    // project.tasks = project.tasks.map((xtask) => {
    //   console.log(xtask._id.toString(), taskId.toString());
    //   return xtask._id.toString() === taskId.toString() ? data.data : xtask;
    // });

    // console.log(project);

    dispatch({
      type: TASK_STATUS_UPDATE_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    // dispatch({
    //   type: TASK_FETCH_SUCCESS,
    //   payload: data,
    // });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const fetchTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/tasks/${taskId}`, config);

    // let project = getState().projectFetch.project;

    // project.tasks.unshift(data.data);

    dispatch({
      type: TASK_FETCH_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    // dispatch({
    //   type: PROJECT_FETCH_SUCCESS,
    //   payload: { success: true, data: project },
    // });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

// fetchMyTasks can take an argument queryOptions as an object with three possible properties' names: keyword, status, and limit.

export const fetchMyTasks = (queryOptions) => async (dispatch, getState) => {
  const keyword = queryOptions?.keyword;
  const limit = queryOptions?.limit;
  const status = queryOptions?.status;

  // console.log(keyword, limit, status);

  let query = [];

  if (keyword) {
    query.push(`keyword=${keyword}`);
  } else {
    if (status) {
      query.push(`status=${status}`);
    }
    if (limit) {
      query.push(`limit=${limit}`);
    }
  }

  // console.log(query);

  try {
    dispatch({
      type: MY_TASKS_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } =
      query.length > 0
        ? await axios.get(
            `/api/v1/tasks?${query.join(',').replace(',', '&')}`,
            config
          )
        : await axios.get(`/api/v1/tasks`, config);

    dispatch({
      type: MY_TASKS_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: MY_TASKS_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const addEmployeeToTask = ({ taskId, employeeToAddToTask }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TASK_EMPLOYEE_ADD_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/tasks/${taskId}/employee/add`,
      { employeeToAddToTask },
      config
    );

    // let project = getState().projectFetch.project;

    // project.tasks.unshift(data.data);

    dispatch({
      type: TASK_EMPLOYEE_ADD_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    // dispatch({
    //   type: PROJECT_EMPLOYEE_ADD_SUCCESS,
    //   payload: { success: true, data: project },
    // });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_EMPLOYEE_ADD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const removeEmployeeFromTask = ({
  taskId,
  employeeToRemoveFromTask,
}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_EMPLOYEE_REMOVE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/tasks/${taskId}/employee/remove`,
      { employeeToRemoveFromTask },
      config
    );

    // let project = getState().projectFetch.project;

    // project.tasks.unshift(data.data);

    dispatch({
      type: TASK_EMPLOYEE_REMOVE_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    // dispatch({
    //   type: PROJECT_EMPLOYEE_REMOVE_SUCCESS,
    //   payload: { success: true, data: project },
    // });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_EMPLOYEE_REMOVE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo
      ? getState().employeeLogin.userInfo.token
      : getState().employeeRegister.userInfo
      ? getState().employeeRegister.userInfo.token
      : null;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.delete(`/api/v1/tasks/${taskId}`, config);

    let tasks = getState().tasksFetch.tasks;

    tasks = tasks.filter(
      (taskItem) => taskItem._id.toString() !== taskId.toString()
    );

    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    dispatch({
      type: TASKS_FETCH_SUCCESS,
      payload: { success: true, data: tasks },
    });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
