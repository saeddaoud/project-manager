import {
  AVATAR_UPDATE_FAIL,
  AVATAR_UPDATE_REQUEST,
  AVATAR_UPDATE_SUCCESS,
  EMPLOYEES_LIST_FAIL,
  EMPLOYEES_LIST_REQUEST,
  EMPLOYEES_LIST_RESET,
  EMPLOYEES_LIST_SUCCESS,
  EMPLOYEE_FETCH_FAIL,
  EMPLOYEE_FETCH_REQUEST,
  EMPLOYEE_FETCH_RESET,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_RESET,
  EMPLOYEE_LOGIN_SUCCESS,
  ME_FETCH_FAIL,
  ME_FETCH_REQUEST,
  ME_FETCH_RESET,
  ME_FETCH_SUCCESS,
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

export const meFetchReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ME_FETCH_REQUEST:
      return { loading: true };
    case ME_FETCH_SUCCESS:
      return { loading: false, success: payload.success, user: payload.data };
    case ME_FETCH_FAIL:
      return { loading: false, error: payload };
    case ME_FETCH_RESET:
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

export const employeesListReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEES_LIST_REQUEST:
      return { loading: true };
    case EMPLOYEES_LIST_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        users: payload.data,
      };
    case EMPLOYEES_LIST_FAIL:
      return { loading: false, error: payload };
    case EMPLOYEES_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const avatarUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case AVATAR_UPDATE_REQUEST:
      return { loading: true };
    case AVATAR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        user: payload.data,
      };
    case AVATAR_UPDATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
