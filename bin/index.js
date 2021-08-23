import getApp from '../server/index.js';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';

getApp().then((app) => {
  app.listen(port, address, () => console.log(`Server started on port ${port}`));
});
