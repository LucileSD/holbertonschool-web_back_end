import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    response.write('This is the list of our students\n');
    readDatabase('../database.csv')
      .then((data) => {
        for (const idx in data) {
          if (data[idx] !== 'SWE' && data[idx] !== 'CS') {
            continue;
          } else if (Number(idx) === data.length - 2) {
            response.write(`Number of students in ${data[idx]}: ${data[Number(idx) + 1].length}. List: ${data[Number(idx) + 1]}`);
          } else {
            response.write(`Number of students in ${data[idx]}: ${data[Number(idx) + 1].length}. List: ${data[Number(idx) + 1]}\n`);
          }
          Number(idx) + 1;
        }
        response.status(200).end();
      })
      .catch((err) => {
        response.status(500).end('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'SWE' && major !== 'CS') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase('../database.csv')
        .then((data) => {
          for (const idx in data) {
            if (data[idx] === major) {
              response.status(200).send(`List: ${data[Number(idx) + 1]}`);
            }
          }
        })
        .catch((err) => {
          response.status(500).send('Cannot load the database');
        });
    }
  }
}

export default StudentsController;
