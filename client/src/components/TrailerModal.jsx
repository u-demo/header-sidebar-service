import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal.jsx';

class TrailerModal extends React.Component {
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
         <div>
           <h1>Trailer Pop Up</h1>
         </div>
      </Modal>
    );
  }
}

TrailerModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default TrailerModal;
