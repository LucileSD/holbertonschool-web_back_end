const chai = require('chai');

const { expect } = chai;
const request = require('request');

describe('test for index page', () => {
  describe('test for status code and body', () => {
    const url = 'http://localhost:7865';
    it('should send the status code 200, Welcome to the payment system', () => {
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
      });
    });
  });
});
