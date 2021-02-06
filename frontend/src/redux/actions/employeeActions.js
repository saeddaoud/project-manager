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
} from '../constants/employeeConstants';

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
      type: ME_FETCH_FAIL,
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
    console.log(data);
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

  localStorage.removeItem('userInfo');
};
