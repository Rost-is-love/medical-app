import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectPatients } from '../slices';

const Patient = ({ name, birthDate }) => {
  const { t } = useTranslation();
  const { first_name, last_name, patronymic } = name;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-between">
        <span className="font-weight-bold mr-3">{`${last_name} ${first_name} ${patronymic}`}</span>
        <span>{birthDate}</span>
      </div>
      <Button
        variant="primary"
        className="nav-link text-left"
        onClick={console.log('тык на конпку')}
      >
        {t('openCard')}
      </Button>
    </li>
  );
};

const PatientList = () => {
  const { t } = useTranslation();
  const patients = useSelector(selectPatients);
  console.log(patients, 'тут должны быть пациенты');
  /* const dispatch = useDispatch();
  // prettier-ignore
  const openModal = (type, channelId = null) => () => {
    dispatch(actions.showModal({ type, channelId }));
  };

  const switchChannel = (id) => () => {
    dispatch(actions.changeCurrentChannel({ id }));
  }; */

  return (
    <div className="mt-5">
      <h2>{t('patientList')}</h2>
      <ul className="list-group">
        {patients.map(({ id, name, birth_date }) => {
          return <Patient key={id} name={name} birthDate={birth_date} />;
        })}
      </ul>
    </div>
  );
};

export default PatientList;
