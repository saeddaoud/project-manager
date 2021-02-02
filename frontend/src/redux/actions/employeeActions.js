import axios from 'axios';

import {
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
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
