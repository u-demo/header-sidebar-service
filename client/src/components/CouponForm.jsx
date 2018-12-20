import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CouponForm.css';

const CouponForm = ({ validateCoupon, couponMessage, inputRef }) => (
  <div>
    <div className={ styles.formGroup }>
      <input
      type="text" name="couponFormInput" placeholder="Enter Coupon" className={ styles.formInput }
      ref={inputRef}/>
      <button type="button" className={ styles.couponFormBtn }
        onClick={validateCoupon}>
        Apply
      </button>
    </div>
    <div className={ styles.couponMessage }>
      {couponMessage}
    </div>
  </div>
);

CouponForm.propTypes = {
  validateCoupon: PropTypes.func.isRequired,
  couponMessage: PropTypes.string.isRequired,
  inputRef: PropTypes.func.isRequired,
};

export default CouponForm;
