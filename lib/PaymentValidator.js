/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

function PaymentValidator() {
}

PaymentValidator.prototype = {
  constructor: PaymentValidator,

  validateCreatePaymentJson: function(create_payment_json, reply) {
    process.nextTick( function() {
      //error = Error("Validation failed.");
      process.nextTick( function() { reply(null, "valid."); });
    });
  }
};

module.exports = PaymentValidator;

