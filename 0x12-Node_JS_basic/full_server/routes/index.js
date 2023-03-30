import { app } from '../server'
import AppController from "../controllers/AppController";
import StudentsController from "../controllers/StudentsController";

app.get('/', (req, res) => {
  AppController;
})

app.get(['/students', '/students/:major'], (req, res) => {
  StudentsController;
})
