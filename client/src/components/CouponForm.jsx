import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/CouponForm.css';

const mapStateToProps = ({ courseDetails: { courseData } }) => ({
  courseData,
});

class CouponForm extends React.Component {
  constructor(props) {
    super(props);
    this.validateCoupon = this.validateCoupon.bind(this);
    this.changePrice = this.changePrice.bind(this);
  }

  changePrice() {
    // only works once because redux
    // does not re-render if discount_price does not change
    const { courseData, changeCoursePrice } = this.props;
    const newPrice = `$${(Number((courseData.discount_price)
      .split('$')[1]) - 5).toFixed(2)}`;
    changeCoursePrice(newPrice);
  }

  validateCoupon() {
    const { courseData } = this.props;
    if (this.input.value === courseData.active_coupon) {
      this.changePrice();
    } else {
      // dispatch invalid coupon message
    }
  }

  render() {
    return (
      <div className={ styles.formGroup }>
        <input
        type="text" name="couponFormInput" placeholder="Enter Coupon" className={ styles.formInput }
        ref={ (node) => { this.input = node; } }/>
        <button type="button" className={ styles.couponFormBtn }
          onClick={this.validateCoupon}>
          Apply
        </button>
      </div>
    );
  }
}

const CouponFormContainer = connect(mapStateToProps)(CouponForm);

export default CouponFormContainer;
