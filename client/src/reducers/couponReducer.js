const initialState = {
  hasCoupon: false,
  couponUsed: false,
  couponPrice: '',
};

const couponInput = (state = initialState, action) => {
  switch (action.type) {
    case 'RENDER_COUPON_INPUT':
      return {
        ...state,
        hasCoupon: true,
      };
    case 'CHANGE_COURSE_PRICE':
      return {
        ...state,
        couponPrice: action.payload,
        couponUsed: true,
      };
    default:
      return state;
  }
};

export default couponInput;
