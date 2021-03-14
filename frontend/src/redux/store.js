import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  avatarUpdateReducer,
  employeeFetchReducer,
  employeeLoginReducer,
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

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const myDetailsFromStorage = localStorage.getItem('myDetails')
  ? JSON.parse(localStorage.getItem('myDetails'))
  : null;

const initialState = {
  employeeLogin: { userInfo: userInfoFromStorage },
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
