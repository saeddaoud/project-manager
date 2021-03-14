import axios from 'axios';

import {
  EMPLOYEE_FETCH_FAIL,
  EMPLOYEE_FETCH_REQUEST,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_RESET,
  EMPLOYEE_FETCH_RESET,
  EMPLOYEES_LIST_FAIL,
  EMPLOYEES_LIST_SUCCESS,
  EMPLOYEES_LIST_REQUEST,
  EMPLOYEES_LIST_RESET,
  ME_FETCH_FAIL,
  ME_FETCH_SUCCESS,
  ME_FETCH_REQUEST,
  ME_FETCH_RESET,
  AVATAR_UPDATE_SUCCESS,
  AVATAR_UPDATE_FAIL,
  AVATAR_UPDATE_REQUEST,
  AVATAR_UPDATE_RESET,
} from '../constants/employeeConstants';
import {
  PROJECTS_FETCH_RESET,
  PROJECT_ADD_RESET,
  PROJECT_DELETE_RESET,
  PROJECT_FETCH_RESET,
  PROJECT_UPDATE_RESET,
} from '../constants/projectConstants';
import {
  MY_TASKS_FETCH_RESET,
  TASKS_FETCH_RESET,
  TASK_ADD_RESET,
  TASK_DELETE_RESET,
  TASK_EMPLOYEE_ADD_RESET,
  TASK_EMPLOYEE_REMOVE_RESET,
  TASK_FETCH_RESET,
  TASK_STATUS_UPDATE_RESET,
  TASK_UPDATE_RESET,
} from '../constants/taskConstants';

export const loginEmployee = (employee) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/auth/login', employee, config);

    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const fetchMe = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ME_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get('/api/v1/employees/me', config);

    dispatch({
      type: ME_FETCH_SUCCESS,
      payload: data,
    });

    localStorage.setItem('myDetails', JSON.stringify(data.data));
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ME_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const fetchEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/employees/${id}`, config);

    dispatch({
      type: EMPLOYEE_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: EMPLOYEE_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const listEmployees = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEES_LIST_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get('/api/v1/employees', config);
    // console.log(data);
    dispatch({
      type: EMPLOYEES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: EMPLOYEES_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const updateAvatar = (avatar) => async (dispatch, getState) => {
  // console.log(avatar);
  try {
    dispatch({
      type: AVATAR_UPDATE_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.post(
      '/api/v1/employees/avatar',
      { avatar },
      config
    );
    // console.log(data);
    dispatch({
      type: AVATAR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: AVATAR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOGIN_RESET,
  });
  dispatch({
    type: EMPLOYEE_FETCH_RESET,
  });
  dispatch({
    type: ME_FETCH_RESET,
  });
  dispatch({
    type: EMPLOYEES_LIST_RESET,
  });
  dispatch({
    type: AVATAR_UPDATE_RESET,
  });
  dispatch({
    type: PROJECTS_FETCH_RESET,
  });
  dispatch({
    type: PROJECT_FETCH_RESET,
  });
  dispatch({
    type: PROJECT_ADD_RESET,
  });
  dispatch({
    type: PROJECT_DELETE_RESET,
  });
  dispatch({
    type: PROJECT_UPDATE_RESET,
  });

  dispatch({
    type: TASKS_FETCH_RESET,
  });
  dispatch({
    type: TASK_ADD_RESET,
  });
  dispatch({
    type: TASK_UPDATE_RESET,
  });
  dispatch({
    type: TASK_DELETE_RESET,
  });
  dispatch({
    type: TASK_FETCH_RESET,
  });
  dispatch({
    type: TASK_STATUS_UPDATE_RESET,
  });
  dispatch({
    type: TASK_EMPLOYEE_REMOVE_RESET,
  });
  dispatch({
    type: TASK_EMPLOYEE_ADD_RESET,
  });
  dispatch({
    type: MY_TASKS_FETCH_RESET,
  });

  localStorage.removeItem('userInfo');
  localStorage.removeItem('myDetails');
};
