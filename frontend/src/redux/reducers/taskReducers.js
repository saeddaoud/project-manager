import {
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
} from '../constants/taskConstants';

export const taskDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
