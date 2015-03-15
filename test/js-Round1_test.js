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
exports['paypal_invoke'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.doesNotThrow(
        function() {
          js_Round1.paypal_invoke(
            function(){},
            function(){}
            );},
        Error,
        'Paypal should not fail.');
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
