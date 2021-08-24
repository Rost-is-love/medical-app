import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        {t('name')}
      </Navbar.Brand>
      <Button onClick={console.log('bam')}>{t('add')}</Button>
    </Navbar>
  );
};

export default Header;
