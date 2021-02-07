import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  employeeFetchReducer,
  employeeLoginReducer,
  employeesListReducer,
  meFetchReducer,
} from './reducers/employeeReducers';
import {
  projectFetchReducer,
  projectsFetchReducer,
} from './reducers/projectReducers';

const middleware = [thunk];

const reducer = combineReducers({
  employeeLogin: employeeLoginReducer,
  meFetch: meFetchReducer,
  employeeFetch: employeeFetchReducer,
  employeesList: employeesListReducer,
  projectsFetch: projectsFetchReducer,
  projectFetch: projectFetchReducer,
});

const userInforFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  employeeLogin: { userInfo: userInforFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
