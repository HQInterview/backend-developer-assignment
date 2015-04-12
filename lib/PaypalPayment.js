/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

//var paypal = require('paypal-rest-sdk');

module.exports = PaypalPayment;

function PaypalPayment() {
}


PaypalPayment.prototype = {
  constructor: PaypalPayment,

  createPaymentInner: function(create_payment_json, reply) {
    reply('yes');

    //var response = paypal.payment.create(create_payment_json,
    //  function(error, payment){}
    //);
  },

  // TODO: Enable 'create' from paypal api
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
            //var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
            //self.createPaymentInner(cc_type, reply);
            self.createPaymentInner(create_payment_json, reply);
          }
        });
  },
};

