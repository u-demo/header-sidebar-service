import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CouponDefault.css';

const CouponDefault = ({ renderCouponInput }) => (
  <div className={ styles.defaultCouponArea }>
    <button className={ styles.defaultCouponBtn }
      onClick={ renderCouponInput }>Have a coupon?</button>
  </div>
);

CouponDefault.propTypes = {
  renderCouponInput: PropTypes.func.isRequired,
};

export default CouponDefault;
