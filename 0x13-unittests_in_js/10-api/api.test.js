const chai = require('chai');

const { expect } = chai;
const request = require('request');

describe('test for index page', () => {
  it('should send the status code 200, Welcome to the payment system', (done) => {
    const object = {
      url: 'http://localhost:7865',
      method: 'GET',
    };
    request(object, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(200);
      expect(body).to.deep.equal('Welcome to the payment system');
      done();
    });
  });

  it('should send status code 200 if id is a number', (done) => {
    const urlObject = {
      url: 'http://localhost:7865/cart/12',
      method: 'GET',
    };
    request(urlObject, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.deep.equal('Payment methods for cart 12');
      done();
    });
  });

  it('should send status code 404 if no id', (done) => {
    const urlObject = {
      url: 'http://localhost:7865/cart/',
      method: 'GET',
    };
    request(urlObject, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(404);
      done();
    });
  });

  it('should send status code 404 if id is a word', (done) => {
    const urlObject = {
      url: 'http://localhost:7865/cart/hello',
      method: 'GET',
    };
    request(urlObject, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(404);
      done();
    });
  });

  it('should send status code 200 and {"payment_methods":{"credit_cards":true,"paypal":false}}', (done) => {
    const urlObject = {
      url: 'http://localhost:7865/available_payments',
      method: 'GET',
    };
    request(urlObject, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(200);
      expect(body).to.deep.equal('{"payment_methods":{"credit_cards":true,"paypal":false}}');
      done();
    });
  });

  it('should send status code 200 and Welcome Betty', (done) => {
    const option = {
      url: 'http://localhost:7865/login',
      method: 'POST',
      json: { userName: 'Betty' },
    };
    request(option, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(200);
      expect(body).to.deep.equal('Welcome Betty');
      done();
    });
  });

  it('should send status code 200 and Welcome undefined', (done) => {
    const option = {
      url: 'http://localhost:7865/login',
      method: 'POST',
    };
    request(option, (err, res, body) => {
      expect(res.statusCode).to.deep.equal(200);
      expect(body).to.deep.equal('Welcome undefined');
      done();
    });
  });
});
