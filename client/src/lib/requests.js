const requests = {
  getCourseData: coursePath => (
    fetch(`${coursePath}header`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
  ),
};

export default requests;
