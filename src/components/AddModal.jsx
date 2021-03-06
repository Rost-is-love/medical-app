import * as yup from 'yup';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import api from '../api.js';
import routes from '../routes.js';
import { selectCurPatient, selectPatientLimit, selectPage, actions } from '../slices';

const normalizeAddressLine = (line, type) => {
  const [street, home, apartment] = line.split(',').map((item) => {
    const splittedItem = item.trim().split(' ');
    return splittedItem[splittedItem.length - 1];
  });

  const map = { street, home, apartment };

  return map[type] ? map[type] : '';
};

const AddModal = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const curPatient = useSelector(selectCurPatient);
  const patientLimit = useSelector(selectPatientLimit);
  const curPage = useSelector(selectPage);
  const today = new Date();
  const maxAge = 150;
  const maxPossibleBirthDate = today.getFullYear() - maxAge;

  const validationSchema = yup.object().shape({
    lastName: yup.string().max(50).required(),
    firstName: yup.string().max(50).required(),
    patronymic: yup.string().max(50).required(),
    birthDate: yup.date().min(maxPossibleBirthDate).max(today).required(),
    gender: yup
      .string()
      .notOneOf([t('gender')])
      .required(),
    chiNumber: yup
      .number()
      .typeError(t('chiError'))
      // eslint-disable-next-line consistent-return
      .test('length', t('chiError'), (val) => {
        if (val) return val.toString().length === 16;
      })
      .required(),
    city: yup.string().required(),
    street: yup.string().required(),
    home: yup.number().typeError(t('notNumber')).required(),
    apartment: yup.number().typeError(t('notNumber')),
  });

  const formik = useFormik({
    initialValues: {
      lastName: curPatient ? curPatient.name.lastName : '',
      firstName: curPatient ? curPatient.name.firstName : '',
      patronymic: curPatient ? curPatient.name.patronymic : '',
      birthDate: curPatient ? curPatient.birthDate : '',
      gender: curPatient ? curPatient.gender : '',
      chiNumber: curPatient ? curPatient.chiNumber : '',
      city: curPatient ? curPatient.address.city : '',
      street: curPatient ? normalizeAddressLine(curPatient.address.line, 'street') : '',
      home: curPatient ? normalizeAddressLine(curPatient.address.line, 'home') : '',
      apartment: curPatient ? normalizeAddressLine(curPatient.address.line, 'apartment') : '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (curPatient) {
          // eslint-disable-next-line no-param-reassign
          values.id = curPatient.id;
          await api.put(routes.updatePath(), values);
        } else {
          await api.post(routes.patientsPath(), values);
        }
        const curPatients = await api.get(routes.patientsPath(), {
          params: {
            limit: patientLimit,
            page: curPage,
          },
        });
        const { data } = curPatients;

        dispatch(actions.initPatients({ data }));
        resetForm();
        dispatch(actions.hideModal());
      } catch (error) {
        if (error.isAxiosError) {
          if (!error.response) {
            setErrors({ feedback: 'networkError' });
            setSubmitting(false);
            return;
          }
          if (error.response.status === 409) {
            setErrors({ chiNumber: 'chiAlreadyExists' });
            setSubmitting(false);
            return;
          }
          if (error.response.status === 404) {
            setErrors({ feedback: 'badRequest' });
            setSubmitting(false);
            return;
          }
          throw error;
        } else {
          throw error;
        }
      }
    },
  });

  const onHide = () => {
    dispatch(actions.hideModal());
  };

  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{curPatient ? t('editCard') : t('addPatient')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Row className="mb-3 form-row">
              <Col className="form-col">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  name="lastName"
                  isInvalid={formik.errors.lastName && formik.touched.lastName}
                  disabled={formik.isSubmitting}
                  placeholder={t('lastName')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.lastName)}
                </Form.Control.Feedback>
              </Col>
              <Col className="form-col">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  name="firstName"
                  isInvalid={formik.errors.firstName && formik.touched.firstName}
                  disabled={formik.isSubmitting}
                  placeholder={t('firstName')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.firstName)}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patronymic}
                  name="patronymic"
                  isInvalid={formik.errors.patronymic && formik.touched.patronymic}
                  disabled={formik.isSubmitting}
                  placeholder={t('patronymic')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.patronymic)}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-3 g-3 form-row">
              <Col className="form-col">
                <Form.Control
                  required
                  type="date"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.birthDate}
                  name="birthDate"
                  isInvalid={formik.errors.birthDate && formik.touched.birthDate}
                  disabled={formik.isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.birthDate)}
                </Form.Control.Feedback>
              </Col>
              <Col className="form-col">
                <Form.Control
                  required
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  name="gender"
                  isInvalid={formik.errors.gender && formik.touched.gender}
                >
                  <option>{t('gender')}</option>
                  <option>{t('male')}</option>
                  <option>{t('female')}</option>
                  <option>{t('other')}</option>
                  <option>{t('unknown')}</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.gender)}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.chiNumber}
                  name="chiNumber"
                  isInvalid={formik.errors.chiNumber && formik.touched.chiNumber}
                  disabled={formik.isSubmitting}
                  placeholder={t('chiNumber')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.chiNumber)}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <h4>{t('address')}</h4>
            <Row className="mt-3 form-row">
              <Col xs={4} className="form-col city-input">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  name="city"
                  isInvalid={formik.errors.city && formik.touched.city}
                  disabled={formik.isSubmitting}
                  placeholder={t('city')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.city)}
                </Form.Control.Feedback>
              </Col>
              <Col xs={4} className="form-col street-input">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  name="street"
                  isInvalid={formik.errors.street && formik.touched.street}
                  disabled={formik.isSubmitting}
                  placeholder={t('street')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.street)}
                </Form.Control.Feedback>
              </Col>
              <Col className="form-col">
                <Form.Control
                  required
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.home}
                  name="home"
                  isInvalid={formik.errors.home && formik.touched.home}
                  disabled={formik.isSubmitting}
                  placeholder={t('home')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.home)}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apartment}
                  name="apartment"
                  isInvalid={formik.errors.apartment && formik.touched.apartment}
                  disabled={formik.isSubmitting}
                  placeholder={t('apartment')}
                />
                <Form.Control.Feedback type="invalid">
                  {t(formik.errors.apartment)}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="text-danger">{t(formik.errors.feedback)}</Col>
            </Row>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting}
              className="mt-4 w-100"
            >
              {t('send')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddModal;
