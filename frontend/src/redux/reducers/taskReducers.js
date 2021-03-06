import {
  TASKS_FETCH_FAIL,
  TASKS_FETCH_REQUEST,
  TASKS_FETCH_RESET,
  TASKS_FETCH_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  TASK_ADD_RESET,
  TASK_ADD_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_FETCH_FAIL,
  TASK_FETCH_REQUEST,
  TASK_FETCH_RESET,
  TASK_FETCH_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_RESET,
  TASK_UPDATE_SUCCESS,
} from '../constants/taskConstants';

export const taskAddReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_ADD_REQUEST:
      return { loading: true };
    case TASK_ADD_SUCCESS:
      return { loading: false, success: payload.success, task: payload.data };
    case TASK_ADD_FAIL:
      return { loading: false, error: payload };
    case TASK_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const taskUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_UPDATE_SUCCESS:
      return { loading: false, success: payload.success, task: payload.data };
    case TASK_UPDATE_FAIL:
      return { loading: false, error: payload };
    case TASK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskFetchReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_FETCH_REQUEST:
      return { loading: true };
    case TASK_FETCH_SUCCESS:
      return { loading: false, success: payload.success, task: payload.data };
    case TASK_FETCH_FAIL:
      return { loading: false, error: payload };
    case TASK_FETCH_RESET:
      return {};
    default:
      return state;
  }
};

export const tasksFetchReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASKS_FETCH_REQUEST:
      return { loading: true };
    case TASKS_FETCH_SUCCESS:
      return { loading: false, success: payload.success, tasks: payload.data };
    case TASKS_FETCH_FAIL:
      return { loading: false, error: payload };
    case TASKS_FETCH_RESET:
      return {};
    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: payload.success };
    case TASK_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
