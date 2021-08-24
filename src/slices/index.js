import { combineReducers } from 'redux';

import patientsSlice from './patientsSlice.js';

export * from './selectors.js';

export const actions = {
  ...patientsSlice.actions,
};

export default combineReducers({
  patientsData: patientsSlice.reducer,
});
