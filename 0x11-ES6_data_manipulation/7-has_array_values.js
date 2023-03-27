export default function hasValuesFromArray(set, array) {
  let bool;
  for (const element of array) {
    bool = set.has(element);
    if (bool === false) {
      break;
    }
  }
  return bool;
}
