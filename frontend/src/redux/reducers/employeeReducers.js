import {
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
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
    case EMPLOYEE_LOGOUT:
      return {};
    default:
      return state;
  }
};
