const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./3-payment');
const utils = require('./utils');

describe('same output', () => {
  it('sendPaymentRequestToApi should call Utils', () => {
    const spyUtils = sinon.spy(utils, 'calculateNumber');
    const apiRequest = sendPaymentRequestToApi(100, 20);
    expect(spyUtils.calledOnceWith('SUM', 100, 20)).to.equal(true);
    expect(utils.calculateNumber('SUM', 100, 20)).to.equal(apiRequest);
    spyUtils.restore();
  });
});
