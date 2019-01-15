import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.listenKeyboard = this.listenKeyboard.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
  }

  listenKeyboard(event) {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true);
    }
  }

  onOverlayClick() {
    this.props.onClose();
  }

  // eslint-disable-next-line class-methods-use-this
  onDialogClick(event) {
    // remove to see why necessary
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div className={styles.modalOverlay} />
        <div className={styles.modalContent}
          onClick={this.onOverlayClick}>
          <div className={styles.modalDialog}
            onClick={this.onDialogClick}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
