import React from 'react';
import { connect } from 'react-redux';
import { changeCoursePrice, couponFailureMessage } from '../actions/couponActions';

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
});

const mapDispatchToProps = {
  changeCoursePrice,
  couponFailureMessage,
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerOnTrailer: false,
    };
    this.trailerHoverHandler = this.trailerHoverHandler.bind(this);
  }

  trailerHoverHandler() {
    this.setState({
      pointerOnTrailer: !this.state.pointerOnTrailer,
    });
  }

  render() {
    const {
      courseData,
      sidebarFixed,
      hasCoupon,
      couponPrice,
      changeCoursePrice,
      couponFailureMessage
    } = this.props;

    let coupon;
    if (!hasCoupon) {
      coupon = <CouponDefault />;
    } else {
      coupon = <CouponForm
                  changeCoursePrice={changeCoursePrice}
                  couponFailureMessage={couponFailureMessage}/>;
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
