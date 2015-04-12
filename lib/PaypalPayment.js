/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });

module.exports = PaypalPayment;

function PaypalPayment() {
}


PaypalPayment.prototype = {
  constructor: PaypalPayment,

  createPaymentInner: function(create_payment_json, reply) {
    var response = paypal.payment.create(create_payment_json,
        function(error, payment){
          if(error) {
            reply(error,"failed.");
          }
          else{
            reply(null,payment);
          }
        });
    console.log(response);
  },

  createPaypalPayment: function(create_payment_json, reply) {
    var validator = new PaymentValidator();
    var self = this;
    validator.validateCreatePaymentJson(create_payment_json,
        function(error, message) {
          if(error) {
            process.nextTick( function() {
              reply(error, message);
            });
          }
          else {
            self.createPaymentInner(create_payment_json, reply);
          }
        });
  },
};

