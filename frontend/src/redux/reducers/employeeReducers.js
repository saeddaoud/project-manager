import {
  EMPLOYEE_FETCH_FAIL,
  EMPLOYEE_FETCH_REQUEST,
  EMPLOYEE_FETCH_RESET,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_RESET,
  EMPLOYEE_LOGIN_SUCCESS,
} from '../constants/employeeConstants';

export const employeeLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEE_LOGIN_REQUEST:
      return { loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { loading: false, error: payload };
    case EMPLOYEE_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeFetchReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEE_FETCH_REQUEST:
      return { loading: true };
    case EMPLOYEE_FETCH_SUCCESS:
      return { loading: false, success: payload.success, user: payload.data };
    case EMPLOYEE_FETCH_FAIL:
      return { loading: false, error: payload };
    case EMPLOYEE_FETCH_RESET:
      return {};
    default:
      return state;
  }
};
