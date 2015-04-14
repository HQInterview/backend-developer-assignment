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
var winston = require('winston');

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
          winston.info("callback");
          if(error) {
            winston.info("reply error.");
            winston.info(util.inspect(error,
                {showHidden: false, depth: null}));
            winston.info("with json object:");
            winston.info(util.inspect(create_payment_json,
                {showHidden: false, depth: null}));
            process.nextTick( function() {
              reply(error,"failed.");
            });
          }
          else{
            if(payment) {
              winston.info("reply payment.");
              process.nextTick( function() {
                reply(null,payment);
              });
            }
            else {
              winston.info("reply empty payment.");
              process.nextTick( function() {
                reply(null,"empty payment");
              });
            }
          }
        });
    if(response){
      winston.info(util.inspect(response, {showHidden: false, depth: null}));
    }
    else {
      winston.info("empty response");
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

