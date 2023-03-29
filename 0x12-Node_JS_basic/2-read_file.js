const fs = require('fs');

module.exports = function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n').filter((line) => line);
    const students = lines.map((str) => {
      const [firstname, lastname, age, field] = str.split(',');
      return {
        firstname, lastname, age, field,
      };
    });
    students.splice(0, 1);
    const countStudent = students.length;
    console.log(`Number of students: ${countStudent}`);
    const fields = new Set(students.map((student) => student.field));
    fields.forEach((subject) => {
      const listOfStudents = students.filter((stu) => stu.field === subject);
      const numberOfStudent = listOfStudents.length;
      const listOfNameStudents = listOfStudents.map((name) => name.firstname);
      const listJoin = listOfNameStudents.join(', ');
      console.log(`Number of students in ${subject}: ${numberOfStudent}. List: ${listJoin}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};
