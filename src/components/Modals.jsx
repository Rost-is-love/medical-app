import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import Add from './AddModal.jsx';
import PatientCard from './PatientCardModal.jsx';
import { selectIsVisible, selectModalType, actions } from '../slices';

const modals = {
  adding: <Add />,
  card: <PatientCard />,
};

const Modals = () => {
  const isVisible = useSelector(selectIsVisible);
  const modalType = useSelector(selectModalType);
  const dispatch = useDispatch();

  if (!isVisible) {
    return null;
  }

  const onHide = () => {
    dispatch(actions.hideModal());
  };

  return (
    <Modal show={isVisible} onHide={onHide} size="lg">
      {modals[modalType]}
    </Modal>
  );
};

export default Modals;
