/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

function BraintreePayment() {
}


// TODO: Enable 'create' from braintree api
BraintreePayment.prototype.createBraintreePayment = function(create_payment_json, reply) {
  PaymentValidator.validator.validateCreatePaymentJson(create_payment_json,
      function(error, message) {
        if(error) {
          process.nextTick( function() {
            reply(error, message);
          });
        }
        else {
          var createBraintreePaymentInner = function(create_payment_json, reply) {
            var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
            var error;
            process.nextTick( function() {
              reply( error, cc_type + " payment succeeded with braintree.");
            });
          };

          var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
          if(cc_type === "visa" ) {
            process.nextTick( function() {
              createBraintreePaymentInner(create_payment_json, reply);
            });
          }
          else if(cc_type === "amex" ) {
            process.nextTick( function() {
              createBraintreePaymentInner(create_payment_json, reply);
            });
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

//exports.PaymentProcessor = PaymentProcessor;
module.exports = BraintreePayment;
