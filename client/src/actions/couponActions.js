const renderCouponInput = () => ({
  type: 'RENDER_COUPON_INPUT',
});

const changeCoursePrice = (couponPrice, couponMessage) => ({
  type: 'CHANGE_COURSE_PRICE',
  couponPrice,
  couponMessage,
});

const setCouponFailureMessage = message => ({
  type: 'COUPON_FAILURE_MESSAGE',
  payload: message,
});

export { renderCouponInput, changeCoursePrice, setCouponFailureMessage };
