import express from 'express';
import cors from 'cors';

import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const devHost = 'http://localhost:8080';
const filePath = isDevelopment ? `${devHost}/assets/` : '/dist/public';

export default () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api', router);
  app.set('views', './server/views');
  app.set('view engine', 'pug');
  app.use(errorHandler);
  app.get('/', (req, res) => {
    res.render('index.pug', {
      getPath: (filename) => `${filePath}/${filename}`,
    });
  });

  return app;
};
