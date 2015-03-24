/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var paymentValidator = {
  validateCreatePaymentJson: function(create_payment_json, reply) {
    process.nextTick( function() {
      //error = Error("Validation failed.");
      var error;
      process.nextTick( function() { reply(error, "valid."); });
    });
  }
};

exports.validator = paymentValidator;

