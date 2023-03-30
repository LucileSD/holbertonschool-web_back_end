const express = require('express');

const app = express();
const port = 1245;

import AppController from "./controllers/AppController";
import StudentsController from "./controllers/StudentsController";

app.get('/', (req, res) => {
  AppController;
})

app.get(['/students', '/students/:major'], (req, res) => {
  StudentsController;
})

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

export default app;
