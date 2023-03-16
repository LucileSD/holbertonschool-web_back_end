export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    // no use var
    const task = true;
    // no use var
    const task2 = false;
  }

  return [task, task2];
}
