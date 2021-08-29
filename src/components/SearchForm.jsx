import * as yup from 'yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import api from '../api.js';
import routes from '../routes.js';
import { selectSearchType, actions } from '../slices';

const SearchForm = () => {
  const { t } = useTranslation();
  const searchType = useSelector(selectSearchType);
  const dispatch = useDispatch();

  const placeholderMap = {
    name: t('lastNamePlaceholder'),
    chiNumber: t('chiNumberPlaceholder'),
  };

  const placeholder = placeholderMap[searchType];

  const changeSearchType = () => {
    dispatch(actions.changeType());
  };

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object().shape({
      body: yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: async ({ body }, { setSubmitting, resetForm, setErrors }) => {
      try {
        const response = await api.get(routes.searchPath(), {
          params: { body, type: searchType },
        });
        const { data } = response;

        if (data.length === 0) {
          setErrors({ body: 'nothingFound' });
          setSubmitting(false);
          return;
        }

        dispatch(actions.initFoundPatients({ data }));
        dispatch(actions.setVisibility({ visibility: true }));
        resetForm();
      } catch (error) {
        if (error.isAxiosError) {
          if (!error.response) {
            setErrors({ body: 'networkError' });
            setSubmitting(false);
            return;
          }
          if (error.response.status === 404) {
            setErrors({ body: 'badRequest' });
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

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <h3>{t('patientSearch')}</h3>
      <InputGroup className="search-form">
        <Form.Control
          required
          name="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          disabled={formik.isSubmitting}
          isInvalid={!formik.isValid}
          placeholder={placeholder}
          className="search-input"
        />
        <InputGroup.Append>
          <Button
            value="Reset"
            variant="outline-secondary"
            onClick={() => {
              formik.setFieldValue('body', '');
              formik.setErrors({});
            }}
          >
            &times;
          </Button>
          <Form.Control
            required
            as="select"
            onChange={changeSearchType}
            onBlur={formik.handleBlur}
            name="type"
            isInvalid={formik.errors.type}
            className="rounded-0"
          >
            <option>{t('searchByLastName')}</option>
            <option>{t('searchByChiNumber')}</option>
          </Form.Control>
          <Button type="submit" variant="primary" className="btn" disabled={formik.isSubmitting}>
            {t('search')}
          </Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">{t(formik.errors.body)}</Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
