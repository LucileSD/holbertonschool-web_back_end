import router from './routes/index';

const express = require('express');

const app = express();
const port = 1245;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

export default app;
