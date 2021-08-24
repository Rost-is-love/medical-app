/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_NUMBER_OF_PATIENTS = 0;

export default createSlice({
  name: 'patientsData',
  initialState: {
    patients: [],
    numberOfPatients: DEFAULT_NUMBER_OF_PATIENTS,
  },
  reducers: {
    initPatients: (state, { payload: { data } }) => {
      console.log(data, 'tut data');
      const { count, rows } = data;
      state.numberOfPatients = count;
      state.patients = rows;
    },
  },
});
