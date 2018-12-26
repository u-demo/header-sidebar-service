import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PurchaseBox.css';

const percentOff = (discount, list) => {
  // initial state has empty data
  if (discount === undefined || list === undefined) {
    return '0%';
  }

  const discountNum = Number(discount.split('$')[1]);
  const listNum = Number(list.split('$')[1]);
  // percentage off rounded and set as string
  const totalPercentOff = ((listNum - discountNum) / listNum).toFixed(2).split('.')[1];
  return `${totalPercentOff}%`;
};

const PurchaseBox = ({ discountPrice, listPrice, showModal }) => (
  <section>
    <div className={ styles.priceBox }>
      <div className={ `${styles.discountPrice} ${styles.price}` }><strong>{ discountPrice }</strong></div>
      <div className={ `${styles.listPrice} ${styles.price}` }>{ listPrice }</div>
      <div className={ `${styles.percentOffItem} ${styles.price}` }><span>{ `${percentOff(discountPrice, listPrice)} off` }</span></div>
    </div>
    <div className={ styles.btnBox }>
      <button className={ `${styles.cartAddBtn} ${styles.buyBtn}` }
        onClick={() => showModal('ADD_TO_CART_MODAL')}
      >Add to Cart</button>
    </div>
    <div className={ styles.btnBox }>
      <button className={ `${styles.buyNowBtn} ${styles.buyBtn}` }>Buy now</button>
    </div>
    <div className={ styles.guarantee }>30-Day Money-Back Guarantee</div>
  </section>
);

PurchaseBox.propTypes = {
  listPrice: PropTypes.string.isRequired,
  discountPrice: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default PurchaseBox;
