import {
  PROJECTS_FETCH_FAIL,
  PROJECTS_FETCH_REQUEST,
  PROJECTS_FETCH_RESET,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_RESET,
  PROJECT_FETCH_SUCCESS,
} from '../constants/projectConstants';

export const projectsFetchReducer = (state = { projects: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_FETCH_REQUEST:
      return { loading: true };
    case PROJECTS_FETCH_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        projects: payload.data,
      };
    case PROJECTS_FETCH_FAIL:
      return { loading: false, error: payload };
    case PROJECTS_FETCH_RESET:
      return { projects: null };
    default:
      return state;
  }
};

export const projectFetchReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECT_FETCH_REQUEST:
      return { loading: true };
    case PROJECT_FETCH_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        project: payload.data,
      };
    case PROJECT_FETCH_FAIL:
      return { loading: false, error: payload };
    case PROJECT_FETCH_RESET:
      return {};
    default:
      return state;
  }
};
