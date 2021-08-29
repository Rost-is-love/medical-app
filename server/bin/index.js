import getApp from '../index.js';
import sequelize from '../db.js';

const run = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  const server = getApp();
  const port = process.env.PORT || 5000;
  const address = '0.0.0.0';

  server.listen(port, address, () => {
    console.log(`Running on port ${port}`);
  });
};

run();
