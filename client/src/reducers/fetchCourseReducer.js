const initialState = {
  courseData: {},
  couponUsed: false,
  isLoading: true,
  fetchError: '',
};

const courseDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE_REQUEST':
      return state;
    case 'FETCH_COURSE_SUCCESS':
      return {
        ...state,
        courseData: action.payload,
        isLoading: false,
      };
    case 'FETCH_COURSE_FAILURE':
      return {
        ...state,
        isLoading: false,
        fetchError: action.error,
      };
    default:
      return state;
  }
};

export default courseDetails;
