const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calcul test SUM', () => {
  describe('test of SUM', () => {
    it('checks number are rounded', () => {
      assert.equal(calculateNumber('SUM', 1.4, 4.5), 6);
    });
  });
  describe('test of SUM', () => {
    it('checks sum of int', () => {
      assert.equal(calculateNumber('SUM', 1, 3), 4);
    });
  });
  describe('test of SUM', () => {
    it('checks sum is rounded with 2 numbers after coma', () => {
      assert.equal(calculateNumber('SUM', 1.25, 3.75), 5);
    });
  });
  describe('test of SUM', () => {
    it('checks a is rounded', () => {
      assert.equal(calculateNumber('SUM', 1.6, 3), 5);
    });
  });
  describe('test of SUM', () => {
    it('checks b is rounded', () => {
      assert.equal(calculateNumber('SUM', 1, 3.58), 5);
    });
  });
  describe('test of SUM', () => {
    it('test sum with a is negative', () => {
      assert.equal(calculateNumber('SUM', -1, 3), 2);
    });
  });
  describe('test of SUM', () => {
    it('test sum of negative numbers', () => {
      assert.equal(calculateNumber('SUM', -1, -3), -4);
    });
  });
  describe('test of SUM', () => {
    it('test sum with b is negative', () => {
      assert.equal(calculateNumber('SUM', 1, -3), -2);
    });
  });
  describe('test of SUM', () => {
    it('test sum with a is negative and float', () => {
      assert.equal(calculateNumber('SUM', -1.56, 3), 1);
    });
  });
  describe('test of SUM', () => {
    it('test sum with b is negative and float', () => {
      assert.equal(calculateNumber('SUM', 1, -3.2), -2);
    });
  });
});

describe('calcul test SUBTRACT', () => {
  describe('test of SUBTRACT', () => {
    it('test sub of 2 int', () => {
      assert.equal(calculateNumber('SUBTRACT', 5, 2), 3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub of 2 float', () => {
      assert.equal(calculateNumber('SUBTRACT', 5.2, 2.3), 3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub of 2 long float', () => {
      assert.equal(calculateNumber('SUBTRACT', 5.256897, 2.37598614), 3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with a is a float', () => {
      assert.equal(calculateNumber('SUBTRACT', 5.25, 2), 3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with b is a float', () => {
      assert.equal(calculateNumber('SUBTRACT', 5, 2.25), 3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with 2negative numbers', () => {
      assert.equal(calculateNumber('SUBTRACT', -5, -2), -3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with a is negative', () => {
      assert.equal(calculateNumber('SUBTRACT', -5, 2), -7);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with b is negative', () => {
      assert.equal(calculateNumber('SUBTRACT', 5, -2), 7);
    });
  });
});

describe('calcul test DIVIDE', () => {
  describe('test of DIVIDE', () => {
    it('test simple division', () => {
      assert.equal(calculateNumber('DIVIDE', 4, 2), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with float', () => {
      assert.equal(calculateNumber('DIVIDE', 4.2, 2.4), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with a is a float', () => {
      assert.equal(calculateNumber('DIVIDE', 4.2, 2), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is a float', () => {
      assert.equal(calculateNumber('DIVIDE', 4, 2.3), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with long float', () => {
      assert.equal(calculateNumber('DIVIDE', 4.2356897, 2.35785912496), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with negative numbers', () => {
      assert.equal(calculateNumber('DIVIDE', -4, -2), 2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with a is a negative numbers', () => {
      assert.equal(calculateNumber('DIVIDE', -4, 2), -2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is a negative numbers', () => {
      assert.equal(calculateNumber('DIVIDE', 4, -2), -2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0', () => {
      assert.equal(calculateNumber('DIVIDE', 4, 0), 'Error');
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0 but float', () => {
      assert.equal(calculateNumber('DIVIDE', 4, 0.23), 'Error');
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0 but float', () => {
      assert.equal(calculateNumber('DIVIDE', 4, 0.89), 4);
    });
  });
});

describe('calcul test', () => {
  describe('test with argument SUM', () => {
    it('argument SUM', () => {
      assert.equal(calculateNumber('SUM', 3, 5), 8);
    });
  });
  describe('test with argument SUBTRACT', () => {
    it('argument SUBTRACT', () => {
      assert.equal(calculateNumber('SUBTRACT', 3, 5), -2);
    });
  });
  describe('test with argument DIVIDE', () => {
    it('argument DIVIDE', () => {
      assert.equal(calculateNumber('DIVIDE', 8, 4), 2);
    });
  });
  describe('test with no argument', () => {
    it('argument unknown', () => {
      assert.throws(() => calculateNumber('', 8, 4), Error);
    });
  });
});
