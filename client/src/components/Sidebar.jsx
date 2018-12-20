import React from 'react';
import { connect } from 'react-redux';
import { changeCoursePrice, setCouponFailureMessage } from '../actions/couponActions';

import Trailer from './Trailer.jsx';
import PurchaseBox from './PurchaseBox.jsx';
import Features from './Features.jsx';
import Interactives from './Interactives.jsx';
import CouponDefault from './CouponDefault.jsx';
import CouponForm from './CouponForm.jsx';
import ShareBox from './ShareBox.jsx';

import styles from '../styles/Sidebar.css';

const mapStateToProps = ({ courseDetails, couponInput }) => ({
  courseData: courseDetails.courseData,
  hasCoupon: couponInput.hasCoupon,
  couponPrice: couponInput.couponPrice,
  couponUsed: couponInput.couponUsed,
  couponMessage: couponInput.couponMessage,
});

const mapDispatchToProps = {
  changeCoursePrice,
  setCouponFailureMessage,
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerOnTrailer: false,
    };

    this.trailerHoverHandler = this.trailerHoverHandler.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.validateCoupon = this.validateCoupon.bind(this);
    this.couponInput = null;
    this.setCouponInputRef = (node) => { this.couponInput = node; };
  }

  trailerHoverHandler() {
    this.setState({
      pointerOnTrailer: !this.state.pointerOnTrailer,
    });
  }

  changePrice() {
    // only works once because redux
    // does not re-render if discount_price does not change
    const newPrice = `$${(Number((this.props.courseData.discount_price)
      .split('$')[1]) - 5).toFixed(2)}`;
    const message = 'Boom, $5 off!';
    this.props.changeCoursePrice(newPrice, message);
  }

  validateCoupon() {
    if (this.props.couponUsed) {
      this.props.setCouponFailureMessage('Can only use a coupon once.');
    } else if (this.couponInput.value === this.props.courseData.active_coupon) {
      this.changePrice();
    } else {
      // dispatch invalid coupon message
      this.props.setCouponFailureMessage('Oops, this coupon is not valid.');
    }
  }

  render() {
    const {
      courseData,
      sidebarFixed,
      hasCoupon,
      couponPrice,
      couponMessage,
    } = this.props;

    let coupon;
    if (!hasCoupon) {
      coupon = <CouponDefault />;
    } else {
      coupon = <CouponForm
                  validateCoupon={this.validateCoupon}
                  couponMessage={couponMessage}
                  inputRef={this.setCouponInputRef}/>;
    }

    return (
      <div className={ styles.rightCol }>
        <div className={sidebarFixed
          ? styles.fixedSideBarContainer
          : styles.sideBarContainer }>
          {!sidebarFixed
          && <Trailer
              img={ courseData.img_url }
              onTrailer={ this.state.pointerOnTrailer }
              trailerHoverHandler={ this.trailerHoverHandler } />
          }
          <div className={ styles.belowTrailer }>
            <PurchaseBox
              discount_price={ couponPrice || courseData.discount_price }
              list_price={ courseData.list_price } />
            <Features
              video_hrs={ courseData.video_hrs }
              total_articles={ courseData.total_articles } />
            <Interactives total_downloads={ courseData.total_downloads }/>
            <section className={ styles.couponBox }>
              { coupon }
            </section>
            <ShareBox />
          </div>
        </div>
      </div>
    );
  }
}

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;
