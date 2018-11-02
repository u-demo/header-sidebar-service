import React from 'react';
import Trailer from './Trailer.jsx';
import PurchaseBox from './PurchaseBox.jsx';
import Features from './Features.jsx';
import Interactives from './Interactives.jsx';
import CouponDefault from './CouponDefault.jsx';
import CouponForm from './CouponForm.jsx';
import ShareBox from './ShareBox.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCoupon: false,
      couponCode: null,
    };
    this.couponClickHandler = this.couponClickHandler.bind(this);
  }

  couponClickHandler(couponCode) {
    this.setState({ 
      hasCoupon: true,
      couponCode: couponCode
    });
  }
  
  render() {
    const { course } = this.props;
    
    let coupon;
    if (!this.state.hasCoupon) {
      coupon = <CouponDefault couponClickHandler={ this.couponClickHandler } active_coupon={ course.active_coupon } />;
    } else {
      coupon = <CouponForm />;
    }

    return (
      <div className="right-col">
        <div className="side-bar-container">
          <Trailer />
          <div className="below-trailer">
            <PurchaseBox discount_price={ course.discount_price } list_price={ course.list_price } />
            <Features video_hrs={ course.video_hrs } total_articles={ course.total_articles }
            />
            <Interactives total_downloads={ course.total_downloads }/>
            <section className="coupon-box">
              { coupon } 
            </section>
            <ShareBox />
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;