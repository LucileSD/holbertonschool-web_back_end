export default function cleanSet(set, startString) {
  let str = [];
  if (startString === '' || startString === undefined) {
    return '';
  }
  for (const element of set) {
    if (typeof element === 'string' && element.startsWith(startString) === true) {
      str.push(element.slice(startString.length));
    }
  }
  return str.join('-');
}
