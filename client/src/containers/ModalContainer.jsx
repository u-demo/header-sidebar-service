import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideModal } from '../actions/modalActions';
// Modal Components
import TrailerModal from '../components/TrailerModal.jsx';
import AddToCartModal from '../components/AddToCartModal.jsx';


const MODAL_COMPONENTS = {
  TRAILER_MODAL: TrailerModal,
  ADD_TO_CART_MODAL: AddToCartModal,
};

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[props.modalType];
  return <SpecificModal hideModal={props.hideModal}/>;
};

const mapStateToProps = ({ toggleModal: { modalType } }) => ({
  modalType,
});

const mapDispatchToProps = {
  hideModal,
};

ModalContainer.propTypes = {
  modalType: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
