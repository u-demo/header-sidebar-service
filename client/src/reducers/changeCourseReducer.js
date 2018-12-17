const initialState = {
  courseData: {},
  bannerHeight: null,
  distanceToBelowTrailer: null,
  headerFixed: false,
  sidebarFixed: false,
  couponUsed: false,
  isLoading: true,
  fetchError: false,
};

const changeCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE_SUCCESS':
      return {
        courseData: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default changeCourseReducer;
