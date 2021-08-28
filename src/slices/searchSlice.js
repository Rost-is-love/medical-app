/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_TYPE = 'name';

export default createSlice({
  name: 'searchData',
  initialState: {
    patients: [],
    type: DEFAULT_TYPE,
    isVisible: false,
  },
  reducers: {
    initFoundPatients: (state, { payload: { data } }) => {
      state.patients = data;
    },
    changeType: (state) => {
      state.type = state.type === DEFAULT_TYPE ? 'chiNumber' : DEFAULT_TYPE;
    },
    setVisibility: (state, { payload: { visibility } }) => {
      state.isVisible = visibility;
    },
  },
});
