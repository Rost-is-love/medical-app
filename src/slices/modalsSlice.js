/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'modalsData',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showModal: (state) => {
      state.isVisible = true;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
  },
});
