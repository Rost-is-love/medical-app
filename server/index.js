import Express from 'express';
import dotenv from 'dotenv';

import sequelize from './db.js';
import models from './models/models.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = new Express();

const runApp = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

runApp();
