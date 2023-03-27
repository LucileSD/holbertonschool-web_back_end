export default function updateUniqueItems(map1) {
  if (!(map1 instanceof Map)) {
    throw new Error('Cannot process');
  }
  for (const [fruit, quantity] of map1) {
    if (quantity === 1) {
      map1.set(fruit, 100);
    }
  }
  return map1;
}
