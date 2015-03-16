'use strict';

var js_Round1 = require('../lib/js-Round1.js');

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

exports['braintree'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.throws(
        function() {js_Round1.braintree();},
        Error,
        'Braintree should fail.');
    test.done();
  },
};

exports['retreive_token'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.throws(
        function() {js_Round1.paypal();},
        Error,
        'Paypal should fail.');
    test.done();
  },
};

var create_payment_json_amex_thb = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "type": "amex",
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
      "currency": "THB",
      "details": {
        "subtotal": "5",
        "tax": "1",
        "shipping": "1"
      }
    },
    "description": "This is the payment transaction description."
  }]
};

var create_payment_json_amex = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",
    "funding_instruments": [{
      "credit_card": {
        "type": "amex",
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

var create_payment_json_visa = {
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

exports['processPaymentRequest'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no throw': function(test) {
    test.expect(1);
    // tests here
    test.doesNotThrow(
        function() {
          js_Round1.processPaymentRequest(
            create_payment_json_visa,
            function(){}
            );},
        Error,
        'Create payment should not fail.');
    test.done();
  },
  'visa pay': function(test) {
    test.expect(1);
    // tests here
    js_Round1.processPaymentRequest(
        create_payment_json_visa,
        function(answer){
          test.equal(answer,
            'Visa payment succeeded with paypal.',
            'createPaypalPayment should succeed.');
        });
    test.done();
  },
  'amex pay': function(test) {
    test.expect(1);
    // tests here
    js_Round1.processPaymentRequest(
        create_payment_json_amex,
        function(answer){
          test.equal(answer,
            'American Express payment succeeded with paypal.',
            'createPaypalPayment should succeed.');
        });
    test.done();
  },
  'amex pay thb': function(test) {
    test.expect(1);
    // tests here
    js_Round1.processPaymentRequest(
        create_payment_json_amex_thb,
        function(answer){
          test.equal(answer,
            'American Express must be used with US Dollars only.',
            'createPaypalPayment should succeed.');
        });
    test.done();
  },
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
          js_Round1.createPaypalPayment(
            create_payment_json_visa,
            function(){}
            );},
        Error,
        'Create payment should not fail.');
    test.done();
  },
  'valid args': function(test) {
    test.expect(1);
    // tests here
    js_Round1.createPaypalPayment(
        create_payment_json_visa,
        function(answer){
          test.equal(answer,
            'Visa payment succeeded with paypal.',
            'createPaypalPayment should succeed.');
        });
    test.done();
  },
};

exports['getPaypalCreditCard'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    var fakeCcId = 1;
    // TODO: This test needs to be updated when the paypal api is active
    test.equal(
        js_Round1.getPaypalCreditCard(fakeCcId),
        fakeCcId,
        'Should return the same CC ID.'
        );
    test.done();
  },
};
exports['create_listener'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    //
    test.doesNotThrow(function() {js_Round1.create_listener('..');},
        Error,
        'Starting the Server should not throw.');
    test.done();
  },
};
