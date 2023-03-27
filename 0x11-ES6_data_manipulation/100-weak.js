export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  let count;

  if (weakMap.get(endpoint) === undefined) {
    count = 0;
  } else {
    count = weakMap.get(endpoint);
  }

  count += 1;
  if (count >= 5) {
    throw new Error('Endpoint load is high');
  }

  weakMap.set(endpoint, count);
}
