import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    response.write('This is the list of our students\n');
    readDatabase('../database.csv')
      .then((data) => {
        for (let idx = 0; idx < data.length; idx ++) {
          if (idx === data.length - 2) {
            response.write(`Number of students in ${data[idx]}: ${data[idx + 1].length}. List: ${data[idx + 1]}`);
          } else {
            response.write(`Number of students in ${data[idx]}: ${data[idx + 1].length}. List: ${data[idx + 1]}\n`);
          }
          idx++;
        }
        response.status(200).end();
      })
      .catch((err) => {
        response.status(500).end('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    console.log(typeof major);
    if (major !== 'SWE' || major !== 'CS') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase('../database.csv')
        .then((data) => {
          response.status(200).send(`${data.join('\n')}`);
        })
        .catch((err) => {
          response.status(500).send('Cannot load the database');
        });
    }
  }
}

export default StudentsController;
