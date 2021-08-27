/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_TYPE = 'name';

export default createSlice({
  name: 'searchData',
  initialState: {
    type: DEFAULT_TYPE,
    patients: [],
  },
  reducers: {
    initFoundPatients: (state, { payload: { data } }) => {
      state.patients = data;
    },
    changeType: (state) => {
      state.type = state.type === DEFAULT_TYPE ? 'chiNumber' : DEFAULT_TYPE;
    },
  },
});
