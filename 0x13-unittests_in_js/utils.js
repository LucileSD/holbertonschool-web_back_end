const Utils = {
  calculateNumber(type, a, b) {
    let result = 0;
    if (!type) {
      throw new TypeError('missing type argument');
    } if (type === 'SUM') {
      result = Math.round(a) + Math.round(b);
    } if (type === 'SUBTRACT') {
      result = Math.round(a) - Math.round(b);
    } if (type === 'DIVIDE') {
      if (Math.round(b) === 0) {
        return 'Error';
      }
      result = Math.round(a) / Math.round(b);
    }
    return result;
  }
}

module.exports = Utils;
