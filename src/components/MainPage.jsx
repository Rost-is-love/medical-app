import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Channels from './Channels.jsx';
// import Messages from './Messages.jsx';
import SearchForm from './SearchForm.jsx';
import PatientList from './PatientList.jsx';
import routes from '../routes.js';
import { actions } from '../slices';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await axios.get(routes.patientssPath());
      const { data } = response;

      dispatch(actions.initPatients({ data }));
    };

    fetchContent();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10 col-lg-8 mx-auto posts">
        <SearchForm />
        <PatientList />
      </div>
    </div>
  );
};

export default MainPage;
