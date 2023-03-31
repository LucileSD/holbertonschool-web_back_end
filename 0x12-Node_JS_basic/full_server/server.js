const express = require('express');

const app = express();
const port = 1245;

import AppController from "./controllers/AppController";
import StudentsController from "./controllers/StudentsController";

app.get('/', (req, res) => {
  const control = new AppController;
  res.send(control);
})

app.get(['/students', '/students/:major'], (req, res) => {
  const classroom = new StudentsController;
  res.send(classroom);
})

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

export default app;
