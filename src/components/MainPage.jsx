import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from './SearchForm.jsx';
import PatientList from './PatientList.jsx';
import PaginationBar from './PaginationBar.jsx';
import routes from '../routes.js';
import api from '../api.js';
import { selectPatientLimit, selectPage, actions } from '../slices';

const MainPage = () => {
  const patientLimit = useSelector(selectPatientLimit);
  const curPage = useSelector(selectPage);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await api.get(routes.patientsPath(), {
        params: {
          limit: patientLimit,
          page: curPage,
        },
      });
      const { data } = response;

      dispatch(actions.initPatients({ data }));
    };

    fetchContent();
  }, [patientLimit, curPage]);

  return (
    <div className="w-100 pb-4">
      <SearchForm />
      <PatientList />
      <PaginationBar />
    </div>
  );
};

export default MainPage;
