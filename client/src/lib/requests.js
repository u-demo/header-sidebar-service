const requests = {
  getCourseData: coursePath => (
    fetch(`${coursePath}header`)
      .then(response => response.json()
        .then(body => ({ response, body })))
  ),
};

export default requests;
