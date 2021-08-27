/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import { selectNumberOfPatients, selectPatientLimit, selectPage, actions } from '../slices';

const PaginationBar = () => {
  const numberOfPatients = useSelector(selectNumberOfPatients);
  const patientLimit = useSelector(selectPatientLimit);
  const curPage = useSelector(selectPage);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(numberOfPatients / patientLimit);
  const pages = [];

  const setPage = (page) => () => {
    dispatch(actions.setPage({ page }));
  };

  if (pageCount < 2) {
    return '';
  }

  for (let i = 0; i < pageCount; i += 1) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item key={page} active={curPage === page} onClick={setPage(page)}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationBar;
