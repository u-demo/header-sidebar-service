import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal.jsx';
import styles from '../styles/MessageModal.css';

class AddToCartModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
         <div className={ styles.wrapper }>
          <p>This course has been added!</p>
         </div>
      </Modal>
    );
  }
}

AddToCartModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default AddToCartModal;
