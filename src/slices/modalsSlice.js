/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'modalsData',
  initialState: {
    type: null,
    isVisible: false,
    patientId: null,
  },
  reducers: {
    showModal: (state, { payload: { type, patientId } }) => {
      state.type = type;
      state.isVisible = true;
      state.patientId = patientId;
    },
    hideModal: (state) => {
      state.type = null;
      state.isVisible = false;
      state.patientId = null;
    },
  },
});
