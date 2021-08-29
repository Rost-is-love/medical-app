import express from 'express';
import cors from 'cors';
import path from 'path';

import sequelize from './db.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const devHost = 'http://localhost:8080';
const domain = isDevelopment ? devHost : '';

export default async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api', router);
  app.set('views', './server/views');
  app.set('view engine', 'pug');
  app.use('/static', express.static(path.join(domain, 'assets')));
  app.use(errorHandler);
  app.get('/', (req, res) => {
    res.render('index.pug', {
      getPath: (filename) => `${domain}/assets/${filename}`,
    });
  });

  await sequelize.authenticate();
  await sequelize.sync();

  return app;
};
