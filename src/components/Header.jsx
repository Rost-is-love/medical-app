import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions } from '../slices';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // prettier-ignore
  const openModal = (type, patientId = null) => () => {
    dispatch(actions.showModal({ type, patientId }));
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        {t('name')}
      </Navbar.Brand>
      <Button onClick={openModal('adding')}>{t('add')}</Button>
    </Navbar>
  );
};

export default Header;
