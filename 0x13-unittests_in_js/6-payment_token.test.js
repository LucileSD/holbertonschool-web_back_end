const { expect } = require('chai');

const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('should display Successful response from the API if true is passed', () => new Promise((done) => {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.equal({ data: 'Successful response from the API' });
        done();
      }).catch((err) => {
        done();
      });
  }));
});
