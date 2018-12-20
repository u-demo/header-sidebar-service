import React from 'react';
import styles from '../styles/CouponDefault.css';

const CouponDefault = ({ renderCouponInput }) => (
  <div className={ styles.defaultCouponArea }>
    <button className={ styles.defaultCouponBtn }
      onClick={ renderCouponInput }>Have a coupon?</button>
  </div>
);

export default CouponDefault;
