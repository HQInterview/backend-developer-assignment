'use strict';

var sinon = require('sinon');
var PaypalPayment = require('../lib/PaypalPayment.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var create_payment_json_visa_usd = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "type": "visa",
        "number": "4417119669820331",
        "expire_month": "11",
        "expire_year": "2018",
        "cvv2": "874",
        "first_name": "Joe",
        "last_name": "Shopper",
        "billing_address": {
          "line1": "52 N Main ST",
          "city": "Johnstown",
          "state": "OH",
          "postal_code": "43210",
          "country_code": "US"
        }
      }
    }]
  },
  "transactions": [{
    "amount": {
      "total": "7",
      "currency": "USD",
      "details": {
        "subtotal": "5",
        "tax": "1",
        "shipping": "1"
      }
    },
    "description": "This is the payment transaction description."
  }]
};

exports['createPaypalPayment'] = {
  setUp: function(done) {
    this.pa = new PaypalPayment();
    this.paymentInner = sinon.stub(this.pa,"createPaymentInner");
    this.paymentInner.withArgs('visa').callsArgWith(1,null, 'visa payment succeeded with paypal.');
    // setup here
    done();
  },
  tearDown: function(done) {
    this.paymentInner.restore();
    done();
  },
  'no throw': function(test) {
    test.expect(1);
    // tests here
    var self = this;
    test.doesNotThrow(
        function() {
          self.pa.createPaypalPayment(
            create_payment_json_visa_usd,
            function(){}
            );},
        Error,
        'Create payment should not fail.');
    test.done();
  },
  'valid args, w/o error': function(test) {
    test.expect(1);
    // tests here
    this.pa.createPaypalPayment(
        create_payment_json_visa_usd,
        function(error){
          test.ifError(error);
          test.done();
        });
  },
  'valid args, correct callback': function(test) {
    test.expect(1);
    // tests here
    this.pa.createPaypalPayment(
        create_payment_json_visa_usd,
        function(error, message){
          test.equal(message,
            'visa payment succeeded with paypal.',
            'createPaypalPayment visa usd should succeed.');
          test.done();
        });
  },
};
