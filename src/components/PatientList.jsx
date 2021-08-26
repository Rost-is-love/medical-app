import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectPatients, selectNumberOfPatients, actions } from '../slices';

const Patient = ({ name, birthDate, openModal }) => {
  const { t } = useTranslation();
  const { firstName, lastName, patronymic } = name;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold mr-3">{[lastName, firstName, patronymic].join(' ')}</span>
        <span>{birthDate}</span>
      </div>
      <Button variant="primary" className="nav-link text-left" onClick={openModal}>
        {t('openCard')}
      </Button>
    </li>
  );
};

const PatientList = () => {
  const { t } = useTranslation();
  const patients = useSelector(selectPatients);
  const numberOfPatients = useSelector(selectNumberOfPatients);
  const dispatch = useDispatch();
  // prettier-ignore
  const openModal = (type, patientId) => () => {
    dispatch(actions.showModal({ type, patientId }));
  };

  if (!numberOfPatients) {
    return <h2 className="mt-5">{t('noPatient')}</h2>;
  }

  return (
    <div className="mt-5">
      <h2>{t('patientList')}</h2>
      <ul className="list-group">
        {patients.map(({ id, name, birthDate }) => {
          return (
            <Patient key={id} name={name} birthDate={birthDate} openModal={openModal('card', id)} />
          );
        })}
      </ul>
    </div>
  );
};

export default PatientList;
