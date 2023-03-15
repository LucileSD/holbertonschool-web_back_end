export default function createIteratorObject(report) {
  let array = [];
  const all = report.allEmployees;
  const val = Object.values(all);
  for (const name of val) {
      array.push(...name);
  }
  return (array);
}
