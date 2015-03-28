'use strict';

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
    // setup here
    done();
  },
  'no throw': function(test) {
    test.expect(1);
    // tests here
    test.doesNotThrow(
        function() {
          var payment = new PaypalPayment();
          payment.createPaypalPayment(
            create_payment_json_visa_usd,
            function(){}
            );},
        Error,
        'Create payment should not fail.');
    test.done();
  },
  'valid args': function(test) {
    test.expect(2);
    // tests here
    var payment = new PaypalPayment();
    payment.createPaypalPayment(
        create_payment_json_visa_usd,
        function(error, message){
          test.ifError(error);
          test.equal(message,
            'visa payment succeeded with paypal.',
            'createPaypalPayment visa usd should succeed.');
          test.done();
        });
  },
};
