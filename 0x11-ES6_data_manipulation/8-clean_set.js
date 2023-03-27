export default function cleanSet(set, startString) {
  let str = '';
  if (startString === '' || startString === undefined) {
    return '';
  }
  for (const element of set) {
    if (typeof element === 'string' && element.startsWith(startString) === true) {
      if (str === '') {
        str += element.slice(3);
      } else {
        str = `${str}-${element.slice(3)}`;
      }
    }
  }
  return str;
}
