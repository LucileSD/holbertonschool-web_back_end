const chai = require('chai');

const { expect } = chai;
const request = require('request');

describe('test for index page', () => {
  describe('test for status code and body', () => {
    it('should send the status code 200, Welcome to the payment system', () => new Promise((done) => {
      const url = 'http://localhost:7865';
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    }));
  });
  describe('test for status code and body with url cart', () => {
    it('should send status code 200 if id is a number', () => new Promise((done) => {
      const url = 'http://localhost:7865/cart/12';
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    }));
  });
  describe('test for status code with url cart with no number', () => {
    it('should send status code 404 if no id', () => new Promise((done) => {
      const url = 'http://localhost:7865/cart/';
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    }));
  });
  describe('test for status code with url cart with letter', () => {
    it('should send status code 404 if id is a word', () => new Promise((done) => {
      const url = 'http://localhost:7865/cart/hello';
      request(url, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    }));
  });
});
