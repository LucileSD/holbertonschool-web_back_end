export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') {
      throw TypeError('Name must be a string');
    }
    if (typeof length !== 'number') {
      throw TypeError('Length must be a number');
    }
    if (!Array.isArray(students)) {
      throw TypeError('Students must be an array of strings');
    }
    students.forEach((element) => {
      if (typeof element !== 'string') {
        throw TypeError('Students must be an array of strings');
      }
    });
    this._name = name;
    this._lenght = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (typeof name !== 'string') {
      throw TypeError(`Name must be a string`);
    }
    this._name = name;
  }

  get lenght() {
    return this._lenght;
  }

  set lenght(lenght) {
    if (typeof lenght !== 'number') {
      throw TypeError(`Lenght must be a number`);
    }
    this._lenght = lenght;
  }

  get students() {
    return this._students;
  }

  set students(students) {
    if (!Array.isArray(students)) {
      throw TypeError(`Students must be an array of strings`);
    }
    students.forEach((element) => {
      if (typeof element !== 'string') {
        throw TypeError('Students must be an array of strings');
      }
    });
    this._students = students;
  }
}
