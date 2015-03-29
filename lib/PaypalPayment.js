/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentValidator = require('./PaymentValidator.js');

module.exports = PaypalPayment;

function PaypalPayment() {
}


PaypalPayment.prototype = {
  constructor: PaypalPayment,

  // TODO: Enable 'create' from paypal api
  createPaypalPayment: function(create_payment_json, reply) {
    var validator = new PaymentValidator();
    validator.validateCreatePaymentJson(create_payment_json,
        function(error, message) {
          if(error) {
            process.nextTick( function() {
              reply(error, message);
            });
          }
          else {
            var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
            if(cc_type === "visa" ) {
              reply( null, cc_type + " payment succeeded with paypal.");
            }
            else if(cc_type === "amex" ) {
              reply( null, cc_type + " payment succeeded with paypal.");
            }
            
    //response = paypal.payment.create(createPamentJson,
    //  function(error, payment){}
    //);
          }
        });
  },
};

