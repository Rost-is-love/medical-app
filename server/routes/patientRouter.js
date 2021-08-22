import Router from 'express';

import patientController from '../controllers/patientController.js';

const router = new Router();

router.post('/', patientController.create);
router.put('/update/', patientController.update);
router.get('/', patientController.getAll);
router.delete('/', patientController.delete);

export default router;
