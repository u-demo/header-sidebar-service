import { combineReducers } from 'redux';
import fetchCourseReducer from './fetchCourseReducer';

const rootReducer = combineReducers({
  fetchCourseReducer,
});

export default rootReducer;
