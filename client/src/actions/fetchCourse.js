import requests from '../lib/requests';

const fetchCourseRequest = () => ({
  type: 'FETCH_COURSE_REQUEST',
});

const fetchCourseSuccess = data => ({
  type: 'FETCH_COURSE_SUCCESS',
  payload: data,
});

const fetchCourseFailure = error => ({
  type: 'FETCH_COURSE_FAILURE',
  error,
});

const fetchCourseData = () => (
  (dispatch) => {
    dispatch(fetchCourseRequest); // initiate spinner
    // window.location.pathname === '/courses/66/'
    return requests.getCourseData(window.location.pathname)
      .then(({ response, body }) => {
        // fetch error
        if (!response.ok) {
          dispatch(fetchCourseFailure(body.message));
        } else { // response ok
          dispatch(fetchCourseSuccess(body));
        }
      });
  }
);

export default fetchCourseData;
