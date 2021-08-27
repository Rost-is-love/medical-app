import Router from 'express';

import {
  createPatient,
  deletePatient,
  updatePatient,
  getAllPatients,
  searchPatients,
} from '../controllers/patientController.js';

const router = new Router();

router.post('/', createPatient);
router.put('/update/', updatePatient);
router.get('/', getAllPatients);
router.get('/search', searchPatients);
router.delete('/', deletePatient);

export default router;
