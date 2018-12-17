import { createStore } from 'redux';
import changeCourseReducer from '../reducers/changeCourseReducer';

const store = createStore(changeCourseReducer);

export default store;
