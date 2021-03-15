import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  avatarUpdateReducer,
  employeeFetchReducer,
  employeeLoginReducer,
  employeeRegisterReducer,
  employeesListReducer,
  meFetchReducer,
} from './reducers/employeeReducers';
import {
  projectAddReducer,
  projectDeleteReducer,
  projectFetchReducer,
  projectsFetchReducer,
  projectUpdateReducer,
} from './reducers/projectReducers';
import {
  myTasksFetchReducer,
  taskAddReducer,
  taskDeleteReducer,
  taskEmployeeAddReducer,
  taskEmployeeRemoveReducer,
  taskFetchReducer,
  tasksFetchReducer,
  taskStatusUpdateReducer,
  taskUpdateReducer,
} from './reducers/taskReducers';

const middleware = [thunk];

const reducer = combineReducers({
  employeeLogin: employeeLoginReducer,
  employeeRegister: employeeRegisterReducer,
  meFetch: meFetchReducer,
  employeeFetch: employeeFetchReducer,
  employeesList: employeesListReducer,
  avatarUpdate: avatarUpdateReducer,
  projectsFetch: projectsFetchReducer,
  projectFetch: projectFetchReducer,
  projectAdd: projectAddReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  taskAdd: taskAddReducer,
  taskUpdate: taskUpdateReducer,
  taskStatusUpdate: taskStatusUpdateReducer,
  taskFetch: taskFetchReducer,
  taskEmployeeAdd: taskEmployeeAddReducer,
  taskEmployeeRemove: taskEmployeeRemoveReducer,
  tasksFetch: tasksFetchReducer,
  myTasksFetch: myTasksFetchReducer,
  taskDelete: taskDeleteReducer,
});

const userInfoFromStorageLogin = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const userInfoFromStorageRegister = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const myDetailsFromStorage = localStorage.getItem('myDetails')
  ? JSON.parse(localStorage.getItem('myDetails'))
  : null;

const initialState = {
  employeeLogin: { userInfo: userInfoFromStorageLogin },
  employeeRegister: { userInfo: userInfoFromStorageRegister },
  meFetch: {
    user: myDetailsFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
