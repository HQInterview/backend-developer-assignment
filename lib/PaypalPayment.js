/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator');

function PaypalPayment() {
}


// TODO: Enable 'create' from paypal api
PaypalPayment.prototype.createPaypalPayment = function(create_payment_json, reply) {

  var createPaypalPaymentInner = function(create_payment_json, reply) {
    var paypal = require('paypal-rest-sdk');
    // TODO: remove this dummy reference to shut-up warning.
    paypal = null;

    //paypal.payment.create(create_payment_json, function (error, payment) {
    //  if (error) {
    //    throw error;
    //  } else {
    //    console.log("Create Payment Response");
    //    console.log(payment);
    var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
    var error = null;
    reply( error, cc_type + " payment succeeded with paypal.");
    //  }
    //});
  };


  PaymentValidator.validator.validateCreatePaymentJson(create_payment_json,
      function(error, message) {
        if(error) {
          process.nextTick( function() {
            reply(error, message);
          });
        }
        else {
          var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
          if(cc_type === "visa" ) {
            process.nextTick(function() {
              createPaypalPaymentInner(create_payment_json, reply);
            });
          }
          else if(cc_type === "amex" ) {
            process.nextTick( function() {
              createPaypalPaymentInner(create_payment_json, reply);
            });
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

module.exports = PaypalPayment;
