import * as yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { selectMessages, selectCurChannelId } from '../slices';

const SearchForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();

  /* useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]); */

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object().shape({
      body: yup.string().required(),
    }),
    validateOnChange: false,
    onSubmit: async ({ body }, { setSubmitting, resetForm, setErrors }) => {
      console.log('search bummm');
      // const message = {
      //   username: nickname,
      //   body,
      //   channelId: currentChannelId,
      // };

      // try {
      //   await socket.sendMessage(message);
      //   resetForm();
      //   inputRef.current.focus();
      // } catch (error) {
      //   setErrors({ body: error.message });
      //   setSubmitting(false);
      // }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          required
          ref={inputRef}
          name="body"
          aria-label="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          disabled={formik.isSubmitting}
          isInvalid={!formik.isValid}
        />
        <InputGroup.Append>
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
