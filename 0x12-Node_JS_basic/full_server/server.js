const express = require('express');

const app = express();
const port = 1245;


app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

export default app;
