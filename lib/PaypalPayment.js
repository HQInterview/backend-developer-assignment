/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

var util = require('util');
var paypal = require('paypal-rest-sdk');

module.exports = PaypalPayment;

function PaypalPayment() {
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });
}


PaypalPayment.prototype = {
  constructor: PaypalPayment,

  createPaymentInner: function(create_payment_json, reply) {
    var response = paypal.payment.create(create_payment_json,
        function(error, payment){
          console.log("callback");
          if(error) {
            console.log("reply error.");
            console.log(error);
            console.log("with json object:");
            console.log(util.inspect(create_payment_json,
                {showHidden: false, depth: null}));
            reply(error,"failed.");
          }
          else{
            if(payment) {
              console.log("reply payment.");
              reply(null,payment);
            }
            else {
              console.log("reply empty payment.");
              reply(null,"empty payment");
            }
          }
        });
    if(response){
      console.log(util.inspect(response, {showHidden: false, depth: null}));
    }
    else {
      console.log("empty response");
    }
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

