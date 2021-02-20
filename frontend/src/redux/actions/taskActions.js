import axios from 'axios';

import {
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
} from '../constants/taskConstants';

import { PROJECT_FETCH_SUCCESS } from '../constants/projectConstants';

export const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    await axios.delete(`/api/v1/tasks/${taskId}`, config);

    let project = getState().projectFetch.project;

    project.tasks = project.tasks.filter(
      (projectTask) => projectTask._id.toString() !== taskId.toString()
    );

    dispatch({
      type: TASK_DELETE_SUCCESS,
      //   payload: data,
    });
    // updata projects in the frontend by deleting the task from tasks without fetching the project with its tasks again from the backend
    dispatch({
      type: PROJECT_FETCH_SUCCESS,
      payload: { success: true, data: project },
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
