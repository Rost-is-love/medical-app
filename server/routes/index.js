import Router from 'express';

import patientRouter from './patientRouter.js';

const router = new Router();

router.use('/patients', patientRouter);

export default router;
