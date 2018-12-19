const renderCouponInput = () => ({
  type: 'RENDER_COUPON_INPUT',
});

const changeCoursePrice = couponPrice => ({
  type: 'CHANGE_COURSE_PRICE',
  payload: couponPrice,
});

export { renderCouponInput, changeCoursePrice };
