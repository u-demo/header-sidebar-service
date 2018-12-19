import { combineReducers } from 'redux';
import courseDetails from './fetchCourseReducer';
import couponInput from './couponReducer';

const rootReducer = combineReducers({
  courseDetails,
  couponInput,
});

export default rootReducer;
