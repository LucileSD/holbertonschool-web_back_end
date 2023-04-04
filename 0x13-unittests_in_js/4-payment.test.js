const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./4-payment');
const utils = require('./utils');

describe('same output', () => {
  it('sendPaymentRequestToApi should call Utils', () => {
    const stubUtils = sinon.stub(utils, 'calculateNumber');
    const consoleSpy = sinon.spy(console, 'log');
    stubUtils.returns(10);
    sendPaymentRequestToApi(100, 20);
    expect(utils.calculateNumber('SUM', 100, 20)).to.equal(10);
    expect(consoleSpy.calledWithExactly('The total is: 10')).to.equal(true);
    stubUtils.restore();
    consoleSpy.restore();
  });
});
