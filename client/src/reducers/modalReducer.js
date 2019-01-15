const initialState = {
  modalType: null,
};

const toggleModal = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modalType: action.modalType,
      };
    case 'HIDE_MODAL':
      return initialState;
    default:
      return state;
  }
};

export default toggleModal;
