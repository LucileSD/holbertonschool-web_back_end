export default function createInt8TypedArray(length, position, value) {
  if (position < length) {
    const buffer = new ArrayBuffer(length);
    const array = new Int8Array(buffer);
    array[position] = value;
    return new DataView(buffer);
  }
  throw new Error('Position outside range');
}
