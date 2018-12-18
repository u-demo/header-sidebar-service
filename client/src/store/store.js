import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import fetchCourseReducer from '../reducers/fetchCourseReducer';

const store = createStore(
  fetchCourseReducer,
  applyMiddleware(thunkMiddleware),
);

export default store;
