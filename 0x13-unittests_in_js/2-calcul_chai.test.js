const chai = require('chai');

const { expect } = chai;
const calculateNumber = require('./2-calcul_chai');

describe('calcul test SUM', () => {
  describe('test of SUM', () => {
    it('checks number are rounded', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });
  });
  describe('test of SUM', () => {
    it('checks sum of int', () => {
      expect(calculateNumber('SUM', 1, 3)).to.equal(4);
    });
  });
  describe('test of SUM', () => {
    it('checks sum is rounded with 2 numbers after coma', () => {
      expect(calculateNumber('SUM', 1.25, 3.75)).to.equal(5);
    });
  });
  describe('test of SUM', () => {
    it('checks a is rounded', () => {
      expect(calculateNumber('SUM', 1.6, 3)).to.equal(5);
    });
  });
  describe('test of SUM', () => {
    it('checks b is rounded', () => {
      expect(calculateNumber('SUM', 1, 3.58)).to.equal(5);
    });
  });
  describe('test of SUM', () => {
    it('test sum with a is negative', () => {
      expect(calculateNumber('SUM', -1, 3)).to.equal(2);
    });
  });
  describe('test of SUM', () => {
    it('test sum of negative numbers', () => {
      expect(calculateNumber('SUM', -1, -3)).to.equal(-4);
    });
  });
  describe('test of SUM', () => {
    it('test sum with b is negative', () => {
      expect(calculateNumber('SUM', 1, -3)).to.equal(-2);
    });
  });
  describe('test of SUM', () => {
    it('test sum with a is negative and float', () => {
      expect(calculateNumber('SUM', -1.56, 3)).to.equal(1);
    });
  });
  describe('test of SUM', () => {
    it('test sum with b is negative and float', () => {
      expect(calculateNumber('SUM', 1, -3.2)).to.equal(-2);
    });
  });
});

describe('calcul test SUBTRACT', () => {
  describe('test of SUBTRACT', () => {
    it('test sub of 2 int', () => {
      expect(calculateNumber('SUBTRACT', 5, 2)).to.equal(3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub of 2 float', () => {
      expect(calculateNumber('SUBTRACT', 5.2, 2.3)).to.equal(3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub of 2 long float', () => {
      expect(calculateNumber('SUBTRACT', 5.256897, 2.37598614)).to.equal(3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with a is a float', () => {
      expect(calculateNumber('SUBTRACT', 5.25, 2)).to.equal(3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with b is a float', () => {
      expect(calculateNumber('SUBTRACT', 5, 2.25)).to.equal(3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with 2negative numbers', () => {
      expect(calculateNumber('SUBTRACT', -5, -2)).to.equal(-3);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with a is negative', () => {
      expect(calculateNumber('SUBTRACT', -5, 2)).to.equal(-7);
    });
  });
  describe('test of SUBTRACT', () => {
    it('test sub with b is negative', () => {
      expect(calculateNumber('SUBTRACT', 5, -2)).to.equal(7);
    });
  });
});

describe('calcul test DIVIDE', () => {
  describe('test of DIVIDE', () => {
    it('test simple division', () => {
      expect(calculateNumber('DIVIDE', 4, 2)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with float', () => {
      expect(calculateNumber('DIVIDE', 4.2, 2.4)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with a is a float', () => {
      expect(calculateNumber('DIVIDE', 4.2, 2)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is a float', () => {
      expect(calculateNumber('DIVIDE', 4, 2.3)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with long float', () => {
      expect(calculateNumber('DIVIDE', 4.2356897, 2.35785912496)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with negative numbers', () => {
      expect(calculateNumber('DIVIDE', -4, -2)).to.equal(2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with a is a negative numbers', () => {
      expect(calculateNumber('DIVIDE', -4, 2)).to.equal(-2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is a negative numbers', () => {
      expect(calculateNumber('DIVIDE', 4, -2)).to.equal(-2);
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0', () => {
      expect(calculateNumber('DIVIDE', 4, 0)).to.equal('Error');
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0 but float', () => {
      expect(calculateNumber('DIVIDE', 4, 0.23)).to.equal('Error');
    });
  });
  describe('test of DIVIDE', () => {
    it('test division with b is 0 but float', () => {
      expect(calculateNumber('DIVIDE', 4, 0.89)).to.equal(4);
    });
  });
});

describe('calcul test', () => {
  describe('test with argument SUM', () => {
    it('argument SUM', () => {
      expect(calculateNumber('SUM', 3, 5)).to.equal(8);
    });
  });
  describe('test with argument SUBTRACT', () => {
    it('argument SUBTRACT', () => {
      expect(calculateNumber('SUBTRACT', 3, 5)).to.equal(-2);
    });
  });
  describe('test with argument DIVIDE', () => {
    it('argument DIVIDE', () => {
      expect(calculateNumber('DIVIDE', 8, 4)).to.equal(2);
    });
  });
  describe('test with no argument', () => {
    it('argument unknown', () => {
      expect(() => { calculateNumber('', 8, 4); }).to.throw(TypeError);
    });
  });
});
