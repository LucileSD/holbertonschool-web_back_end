const calculateNumber = require("./0-calcul.js")
const assert = require('assert');

describe("calcul test", () => {
  it("checks sum of int", () => {
    assert.equal(calculateNumber(1, 3), 4);
  })
})

describe("calcul test", () => {
  it("checks sum is rounded", () => {
    assert.equal(calculateNumber(1.2, 3.7), 5);
  })
})

describe("calcul test", () => {
  it("checks sum is rounded with 2 numbers after coma", () => {
    assert.equal(calculateNumber(1.25, 3.75), 5);
  })
})

describe("calcul test", () => {
  it("checks a is rounded", () => {
    assert.equal(calculateNumber(1.6, 3), 5);
  })
})

describe("calcul test", () => {
  it("checks b is rounded", () => {
    assert.equal(calculateNumber(1, 3.6), 5);
  })
})

describe("calcul test", () => {
  it("checks a long float are rounded", () => {
    assert.equal(calculateNumber(1.665897, 3.895477656), 6);
  })
})

describe("calcul test", () => {
  it("test sum of negative numbers", () => {
    assert.equal(calculateNumber(-1, -3), -4);
  })
})

describe("calcul test", () => {
  it("test sum with a is negative", () => {
    assert.equal(calculateNumber(-1, 3), 2);
  })
})

describe("calcul test", () => {
  it("test sum with b is negative", () => {
    assert.equal(calculateNumber(1, -3), -2);
  })
})

describe("calcul test", () => {
  it("test sum with a is negative and float", () => {
    assert.equal(calculateNumber(-1.56, 3), 1);
  })
})

describe("calcul test", () => {
  it("test sum with b is negative and float", () => {
    assert.equal(calculateNumber(1, -3.2), -2);
  })
})
