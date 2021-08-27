/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_TYPE = 'name';
/* const DEFAULT_NUMBER_OF_PATIENTS = 0;
const DEFAULT_PATIENT_LIMIT = 10;
const DEFAULT_PAGE = 1; */

export default createSlice({
  name: 'searchData',
  initialState: {
    type: DEFAULT_TYPE,
    /* patients: [],
    numberOfPatients: DEFAULT_NUMBER_OF_PATIENTS,
    patientLimit: DEFAULT_PATIENT_LIMIT,
    page: DEFAULT_PAGE, */
  },
  reducers: {
    changeType: (state) => {
      state.type = state.type === DEFAULT_TYPE ? 'chiNumber' : DEFAULT_TYPE;
    },
  },
});
