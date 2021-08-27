import { createSelector } from '@reduxjs/toolkit';

export const selectPatients = (state) => state.patientsData.patients;
export const selectNumberOfPatients = (state) => state.patientsData.numberOfPatients;
export const selectPatientLimit = (state) => state.patientsData.patientLimit;
export const selectPage = (state) => state.patientsData.page;
export const selectIsVisible = (state) => state.modalsData.isVisible;
export const selectModalType = (state) => state.modalsData.type;
export const selectSearchType = (state) => state.searchData.type;

const selectCurPatientId = (state) => state.modalsData.patientId;
export const selectCurPatient = createSelector(
  [selectPatients, selectCurPatientId],
  (patients, patientId) => patients.find(({ id }) => id === patientId),
);
