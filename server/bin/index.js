import dotenv from 'dotenv';

import getApp from '../index.js';

dotenv.config();

const port = process.env.PORT || 5000;

getApp().then(async (app) => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
