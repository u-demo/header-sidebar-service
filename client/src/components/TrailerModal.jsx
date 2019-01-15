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
           <iframe src="https://www.youtube.com/embed/18rARy8g4Hc" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
         </div>
      </Modal>
    );
  }
}

TrailerModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default TrailerModal;
