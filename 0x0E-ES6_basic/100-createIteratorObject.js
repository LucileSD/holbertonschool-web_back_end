export default function createIteratorObject(report) {
  const array = [];
  for (const name of Object.values(report.allEmployees)) {
    array.push(...name);
  }
  return (array);
}
