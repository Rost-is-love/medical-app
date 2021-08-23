import express from 'express';
import cors from 'cors';

import router from './routes/index.js';
import sequelize from './db.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

export default async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', router);

  app.use(errorHandler);

  await sequelize.authenticate();
  await sequelize.sync();

  return app;
};
