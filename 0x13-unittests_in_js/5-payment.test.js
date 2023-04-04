const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');

describe('test sendPaymentRequestToAPI', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  describe('sendPaymentRequestToAPI call console log', () => {
    it('should console log The total is: 120 once', () => {
      sendPaymentRequestToApi(100, 20);
      expect(consoleSpy.calledWithExactly('The total is: 120')).to.equal(true);
      expect(consoleSpy.calledOnce).to.equal(true);
    });
  });

  describe('should console log The total is: 20 once', () => {
    it('should console log The total is: 20 once', () => {
      sendPaymentRequestToApi(10, 10);
      expect(consoleSpy.calledWithExactly('The total is: 20')).to.equal(true);
      expect(consoleSpy.calledOnce).to.equal(true);
    });
  });
});
