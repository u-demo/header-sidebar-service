const initialState = {
  hasCoupon: false,
  couponUsed: false,
  couponPrice: '',
  couponMessage: '',
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
        couponPrice: action.couponPrice,
        couponMessage: action.couponMessage,
        couponUsed: true,
      };
    case 'COUPON_FAILURE_MESSAGE':
      return {
        ...state,
        couponMessage: action.payload,
      };
    default:
      return state;
  }
};

export default couponInput;
