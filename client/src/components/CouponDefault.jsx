import React from 'react';
import { connect } from 'react-redux';
import { renderCouponInput } from '../actions/couponActions';
import styles from '../styles/CouponDefault.css';

const mapDispatchToProps = {
  renderCouponInput,
};

const CouponDefault = ({ renderCouponInput }) => (
  <div className={ styles.defaultCouponArea }>
    <button className={ styles.defaultCouponBtn }
      onClick={ renderCouponInput }>Have a coupon?</button>
  </div>
);

const CouponDefaultContainer = connect(null, mapDispatchToProps)(CouponDefault);

export default CouponDefaultContainer;
