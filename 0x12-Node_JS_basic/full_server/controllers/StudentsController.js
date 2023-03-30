import { readDatabase } from "../utils";

export default class StudentsController {
  static getAllStudents(request, response) {
    response.write('This is the list of our students');
    readDatabase('../database.csv')
    .then((data) => {
      request.status(200).send(`${data.join('\n')}`);
    })
    .catch((err) => {
      request.status(500).send('Cannot load the database');
  })
  }

  static getAllStudentsByMajor(request, response) {
    const major = req.params['major'];
    if (major !== 'CS' || major !== 'SWE') {
      request.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase('../database.csv')
      .then((data) => {
        request.status(200).send(`${data.join('\n')}`);
      })
      .catch((err) => {
        request.status(500).send('Cannot load the database');
    })
    }
  }
}
