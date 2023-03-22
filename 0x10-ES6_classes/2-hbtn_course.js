export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== "string") {
      throw new TypeError("Name must be a string");
    }
    if (typeof length !== "number") {
      throw new TypeError("Length must be a number");
    }
    if (!Array.isArray(students)) {
      throw new TypeError("Students must be an array");
    }
    this._name = name;
    this._lenght = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (typeof name !== "string") {
      throw new TypeError(`Name must be a string`);
    }
    this._name = name;
  }

  get lenght() {
    return this._lenght;
  }

  set lenght(lenght) {
    if (typeof lenght !== "number") {
      throw new TypeError(`Lenght must be a number`);
    }
    this._lenght = lenght;
  }

  get students() {
    return this._students;
  }

  set students(students) {
    if (!Array.isArray(students)) {
      throw new TypeError(`Students must be an array`);
    }
    this._students = students;
  }
}
