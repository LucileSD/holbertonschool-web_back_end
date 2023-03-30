import fs from 'fs';

export function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const response = [];
        const lines = data.split('\n').filter((line) => line);
        const students = lines.map((str) => {
          const [firstname, lastname, age, field] = str.split(',');
          return {
            firstname, lastname, age, field,
          };
        });
        students.splice(0, 1);
        const fields = new Set(students.map((student) => student.field));
        fields.forEach((subject) => {
          const listOfStudents = students.filter((stu) => stu.field === subject);
          const listOfNameStudents = listOfStudents.map((name) => name.firstname);
          const listJoin = listOfNameStudents.join(', ');
          console.log(`List: ${listJoin}`);
          response.push(`List: ${listJoin}`);
        });
        resolve(response);
      }
    });
  });
}
