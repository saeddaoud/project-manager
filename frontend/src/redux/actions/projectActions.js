import axios from 'axios';

import {
  // ACTIVE_PROJECTS_FETCH_FAIL,
  // ACTIVE_PROJECTS_FETCH_REQUEST,
  // ACTIVE_PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_FAIL,
  PROJECTS_FETCH_REQUEST,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
} from '../constants/projectConstants';

// fetchProjects can take an argument queryOptions as an object with three possible properties' names: keyword, status, and limit.

export const fetchProjects = (queryOptions) => async (dispatch, getState) => {
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

  // console.log(query.length);

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

    const { data } =
      query.length > 0
        ? await axios.get(
            `/api/v1/projects?${query.join(',').replace(',', '&')}`,
            config
          )
        : await axios.get(`/api/v1/projects`, config);

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

// export const fetchActiveProjects = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ACTIVE_PROJECTS_FETCH_REQUEST,
//     });

//     let token = getState().employeeLogin.userInfo.token;
//     token = `Bearer ${token}`;

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     };

//     const { data } = await axios.get(
//       `/api/v1/projects?status=active&limit=3`,
//       config
//     );

//     dispatch({
//       type: ACTIVE_PROJECTS_FETCH_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error.response.data.error);
//     dispatch({
//       type: ACTIVE_PROJECTS_FETCH_FAIL,
//       payload:
//         error.response && error.response.data.error
//           ? error.response.data.error
//           : error.message,
//     });
//   }
// };

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

export const addProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_ADD_REQUEST,
    });

    let token = getState().employeeLogin.userInfo.token;
    token = `Bearer ${token}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.post(`/api/v1/projects`, project, config);

    const fetchedProjects = getState().projectsFetch.projects;

    fetchedProjects.unshift(data.data);

    dispatch({
      type: PROJECT_ADD_SUCCESS,
      payload: data,
    });
    // updata projects in the frontend by appending the new added project without fetching all the projects again from the backend
    dispatch({
      type: PROJECTS_FETCH_SUCCESS,
      payload: { success: true, data: fetchedProjects },
    });
  } catch (error) {
    // console.log(error.response.data.error);
    dispatch({
      type: PROJECT_ADD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
