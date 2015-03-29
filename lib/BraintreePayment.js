/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

module.exports = BraintreePayment;

function BraintreePayment() {
}

// TODO: Enable 'create' from braintree api
BraintreePayment.prototype.createBraintreePayment = function(create_payment_json, reply) {
  var inner = function(error, message) {
    if(error) {
      console.log("error");
      process.nextTick( function() {
        reply(error, message);
      });
    }
    else {
      var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
      if(cc_type === "visa" ) {
        process.nextTick( function() {
          reply( null, cc_type + " payment succeeded with braintree.");
        });
      }
      else if(cc_type === "amex" ) {
        process.nextTick( function() {
          reply( null, cc_type + " payment succeeded with braintree.");
        });
      }
      //response = paypal.payment.create(createPamentJson,
      //  function(error, payment){}
      //);
    }
  };
  var validator = new PaymentValidator();
  validator.validateCreatePaymentJson(create_payment_json, inner);
};
