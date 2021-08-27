import { combineReducers } from 'redux';

import patientsSlice from './patientsSlice.js';
import modalsSlice from './modalsSlice.js';
import searchSlice from './searchSlice.js';

export * from './selectors.js';

export const actions = {
  ...patientsSlice.actions,
  ...modalsSlice.actions,
  ...searchSlice.actions,
};

export default combineReducers({
  patientsData: patientsSlice.reducer,
  modalsData: modalsSlice.reducer,
  searchData: searchSlice.reducer,
});
