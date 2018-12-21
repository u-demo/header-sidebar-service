import { combineReducers } from 'redux';
import courseDetails from './fetchCourseReducer';
import couponInput from './couponReducer';
import toggleModal from './modalReducer';

const rootReducer = combineReducers({
  courseDetails,
  couponInput,
  toggleModal,
});

export default rootReducer;
