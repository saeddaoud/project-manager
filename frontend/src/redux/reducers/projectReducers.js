import {
  // ACTIVE_PROJECTS_FETCH_FAIL,
  // ACTIVE_PROJECTS_FETCH_REQUEST,
  // ACTIVE_PROJECTS_FETCH_RESET,
  // ACTIVE_PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_FAIL,
  PROJECTS_FETCH_REQUEST,
  PROJECTS_FETCH_RESET,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_RESET,
  PROJECT_ADD_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_RESET,
  PROJECT_DELETE_SUCCESS,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_RESET,
  PROJECT_FETCH_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_RESET,
  PROJECT_UPDATE_SUCCESS,
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

// export const activeProjectsFetchReducer = (
//   state = { projects: null },
//   action
// ) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ACTIVE_PROJECTS_FETCH_REQUEST:
//       return { loading: true };
//     case ACTIVE_PROJECTS_FETCH_SUCCESS:
//       return {
//         loading: false,
//         success: payload.success,
//         projects: payload.data,
//       };
//     case ACTIVE_PROJECTS_FETCH_FAIL:
//       return { loading: false, error: payload };
//     case ACTIVE_PROJECTS_FETCH_RESET:
//       return { projects: null };
//     default:
//       return state;
//   }
// };

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

export const projectAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECT_ADD_REQUEST:
      return { loading: true };
    case PROJECT_ADD_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        project: payload.data,
      };
    case PROJECT_ADD_FAIL:
      return { loading: false, error: payload };
    case PROJECT_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const projectUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true };
    case PROJECT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        project: payload.data,
      };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PROJECT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true };
    case PROJECT_DELETE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        // project: payload.data,
      };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: payload };
    case PROJECT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
