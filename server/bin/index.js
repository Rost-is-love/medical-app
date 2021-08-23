import dotenv from 'dotenv';

import getApp from '../index.js';
import sequelize from '../db.js';

dotenv.config();

const port = process.env.PORT || 5000;

getApp().then(async (app) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
});
