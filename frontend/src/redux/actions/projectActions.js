import axios from 'axios';

import {
  ACTIVE_PROJECTS_FETCH_FAIL,
  ACTIVE_PROJECTS_FETCH_REQUEST,
  ACTIVE_PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_FAIL,
  PROJECTS_FETCH_REQUEST,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
} from '../constants/projectConstants';

export const fetchProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECTS_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/projects`, config);

    dispatch({
      type: PROJECTS_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: PROJECTS_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const fetchActiveProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTIVE_PROJECTS_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/projects/active?limit=3`, config);

    dispatch({
      type: ACTIVE_PROJECTS_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ACTIVE_PROJECTS_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const fetchProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_FETCH_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/projects/${id}`, config);

    dispatch({
      type: PROJECT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: PROJECT_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
