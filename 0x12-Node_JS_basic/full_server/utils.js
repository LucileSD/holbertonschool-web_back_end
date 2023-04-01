import fs from 'fs';

export default function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error(err));
      } else {
        const lines = data.split('\n').filter((line) => line);
        const students = lines.map((str) => {
          const [firstname, lastname, age, field] = str.split(',');
          return [
            firstname, lastname, age, field,
          ];
        });
        students.splice(0, 1);
        const classroom = students.reduce(
          (accumulator, currentValue) => {
            const firstname = currentValue[0];
            const field = currentValue[3];
            if (!accumulator[field]) {
              accumulator[field] = [];
            }
            accumulator[field].push(firstname);
            return (Object.fromEntries(Object.entries(accumulator).sort()));
          }, {},
        );
        resolve(classroom);
      }
    });
  });
}
