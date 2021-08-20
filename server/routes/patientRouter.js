import Router from 'express';

import patientController from '../controllers/patientController.js';

const router = new Router();

router.post('/', patientController.create);
router.post('/edit/:id');
router.get('/', patientController.getOne);
router.get('/:id');
router.delete('/:id');

export default router;
