import { combineReducers } from 'redux';

import patientsSlice from './patientsSlice.js';
import modalsSlice from './modalsSlice.js';

export * from './selectors.js';

export const actions = {
  ...patientsSlice.actions,
  ...modalsSlice.actions,
};

export default combineReducers({
  patientsData: patientsSlice.reducer,
  modalsData: modalsSlice.reducer,
});
