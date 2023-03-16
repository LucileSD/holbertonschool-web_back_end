export default function createIteratorObject(report) {
  let array = [];
  for (const name of Object.values(report.allEmployees)) {
      array.push(...name);
  }
  return (array);
}
