/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_NUMBER_OF_PATIENTS = 0;
const DEFAULT_PATIENT_LIMIT = 10;
const DEFAULT_PAGE = 1;

export default createSlice({
  name: 'patientsData',
  initialState: {
    patients: [],
    numberOfPatients: DEFAULT_NUMBER_OF_PATIENTS,
    patientLimit: DEFAULT_PATIENT_LIMIT,
    page: DEFAULT_PAGE,
  },
  reducers: {
    initPatients: (state, { payload: { data } }) => {
      const { count, rows } = data;

      state.numberOfPatients = count;
      state.patients = rows;
    },
    setPage: (state, { payload: { page } }) => {
      state.page = page;
    },
  },
});
