import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import api from '../api.js';
import routes from '../routes.js';
import { selectCurPatient, actions } from '../slices';

const PatientCardModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removingError, setRemovingError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const curPatient = useSelector(selectCurPatient);
  const { id, name, birthDate, gender, chiNumber, address } = curPatient;
  const { lastName, firstName, patronymic } = name;
  const { city, line } = address;

  const onHide = () => {
    dispatch(actions.hideModal());
  };
  // prettier-ignore
  const openModal = (type, patientId = null) => () => {
      dispatch(actions.showModal({ type, patientId }));
    };

  const removePatient = async () => {
    setRemovingError(null);
    try {
      setIsSubmitting(true);

      await api.delete(routes.patientsPath(), { data: { id } });
      setIsSubmitting(false);
      onHide();

      const curPatients = await api.get(routes.patientsPath());
      const { data } = curPatients;

      dispatch(actions.initPatients({ data }));
    } catch (error) {
      if (error.isAxiosError) {
        if (!error.response) {
          setRemovingError('networkError');
          setIsSubmitting(false);
          return;
        }
        if (error.response.status === 404) {
          setRemovingError('badRequest');
          setIsSubmitting(false);
          return;
        }
        throw error;
      } else {
        throw error;
      }
    }
  };

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('patientCard')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="pl-3 pr-3 mb-3">
          <Col>
            <Row className="font-weight-bold">{t('fullName')}</Row>
            <Row>{[lastName, firstName, patronymic].join(' ')}</Row>
          </Col>
        </Row>
        <Row className="pl-3 pr-3 mb-3">
          <Col>
            <Row className="font-weight-bold">{t('birthDate')}</Row>
            <Row>{birthDate}</Row>
          </Col>
          <Col>
            <Row className="font-weight-bold">{t('gender')}</Row>
            <Row>{gender}</Row>
          </Col>
          <Col>
            <Row className="font-weight-bold">{t('chiNumber')}</Row>
            <Row>{chiNumber}</Row>
          </Col>
        </Row>
        <Row className="pl-3 pr-3 mb-3">
          <Col>
            <Row className="font-weight-bold">{t('address')}</Row>
            <Row>{[city, line].join(' ')}</Row>
          </Col>
        </Row>
        <div className="invalid-feedback d-block mb-4">{t(removingError)}</div>
        <Row className="pl-3 pr-3 d-flex justify-content-around">
          <Button
            className="col-5"
            type="submit"
            variant="danger"
            onClick={removePatient}
            disabled={isSubmitting}
          >
            {t('remove')}
          </Button>
          <Button
            className="col-5"
            type="button"
            variant="primary"
            onClick={openModal('adding', id)}
            disabled={isSubmitting}
          >
            {t('edit')}
          </Button>
        </Row>
      </Modal.Body>
    </>
  );
};

export default PatientCardModal;
