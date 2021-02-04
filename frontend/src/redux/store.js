import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  employeeFetchReducer,
  employeeLoginReducer,
} from './reducers/employeeReducers';

const middleware = [thunk];

const reducer = combineReducers({
  employeeLogin: employeeLoginReducer,
  employeeFetch: employeeFetchReducer,
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
