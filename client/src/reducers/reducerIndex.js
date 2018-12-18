import { combineReducers } from 'redux';
import changeCourseReducer from './fetchCourseReducer';

const rootReducer = combineReducers({
  changeCourseReducer,
});

export default rootReducer;
