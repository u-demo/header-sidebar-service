const changeCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_COURSE_DATA':
      return {
        courseData: action.data,
      };
    default:
      return state;
  }
};

export default changeCourseReducer;
