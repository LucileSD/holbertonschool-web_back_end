export default function appendToEachArrayValue(array, appendString) {
  let newArray = []
  for (let idx of array) {
    newArray.push(`${appendString}${idx}`);
  }

  return newArray;
}
