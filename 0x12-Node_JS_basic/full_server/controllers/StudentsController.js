import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    response.write('This is the list of our students\n');
    const speciality = [];
    readDatabase(process.argv[3])
      .then((data) => {
        Object.entries(data).forEach(([key, value]) => {
          speciality.push(`Number of students in ${key}: ${value.length}. List: ${value.join(', ')}`);
        });
        response.status(200).end(`${speciality.join('\n')}`);
      })
      .catch(() => {
        response.status(500).end('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const listInSpe = [];
    if (major !== 'SWE' && major !== 'CS') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase(process.argv[3])
        .then((data) => {
          Object.entries(data).forEach(([key, value]) => {
            if (key === major) {
              listInSpe.push(`List: ${value.join(', ')}`);
            }
          });
          response.status(200).end(`${listInSpe}`);
        })
        .catch(() => {
          response.status(500).send('Cannot load the database');
        });
    }
  }
}

export default StudentsController;
