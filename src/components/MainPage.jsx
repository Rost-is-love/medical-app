import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Channels from './Channels.jsx';
// import Messages from './Messages.jsx';
import SearchForm from './SearchForm.jsx';
import PatientList from './PatientList.jsx';
import routes from '../routes.js';
import api from '../api.js';
import { actions } from '../slices';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await api.get(routes.patientsPath());
      const { data } = response;

      dispatch(actions.initPatients({ data }));
    };

    fetchContent();
  }, []);

  return (
    <div className="w-100">
      <SearchForm />
      <PatientList />
    </div>
  );
};

export default MainPage;
