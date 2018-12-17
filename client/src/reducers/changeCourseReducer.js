const changeCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_COURSE_DATA':
      return {
        courseId: action.data.id,
        courseData: action.data,
        discountPrice: action.data.discount_price,
        listPrice: action.data.list_price,
      };
    default:
      return state;
  }
};
