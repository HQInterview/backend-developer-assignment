/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var BraintreePayment = require('./BraintreePayment.js');
var PaypalPayment = require('./PaypalPayment.js');

var winston = require('winston');

module.exports = PaymentProcessor;

function PaymentProcessor() {
    this.payment = new PaypalPayment();
}

PaymentProcessor.prototype = {
  constructor: PaymentProcessor,

  // TODO: Enable 'create' from paypal api
  processPaymentRequest: function(create_payment_json, reply) {
    // TODO: handle malformed data

    // TODO: this logic is confusing and error prone, cleanup
    var accountNumber = create_payment_json.payer.funding_instruments[0].credit_card.number;
    winston.info("cc#: " + accountNumber);
    var cc_type = (function () {
      // taken from:
      // http://webstandardssherpa.com/reviews/auto-detecting-credit-card-type/
        //start without knowing the credit card type
        var result = "unknown";

        //first check for MasterCard
        if (/^5[1-5]/.test(accountNumber))
        {
          result = "mastercard";
        }

        //then check for Visa
        else if (/^4/.test(accountNumber))
        {
          result = "visa";
        }

        //then check for AmEx
        else if (/^3[47]/.test(accountNumber))
        {
          result = "amex";
        }

        return result;
      })();

    winston.info("replace cc: " + create_payment_json.payer.funding_instruments[0].credit_card.type);
    winston.info("cc type: " + cc_type);

    if( cc_type ) {
      create_payment_json.payer.funding_instruments[0].credit_card.type = cc_type;  
    }

    var currency = create_payment_json.transactions[0].amount.currency;
    if(create_payment_json.payer.funding_instruments[0].credit_card.type === "amex" ) {
      if( currency === "USD" ) {
        this.payment.createPaypalPayment(create_payment_json, reply);
      }
      else {
        process.nextTick( function() {
          var error = new Error("American Express must be used with US Dollars only.");
          reply(error,"American Express must be used with US Dollars only.");
        });
      }
    }
    else {
      if( currency === "USD" || currency === "EUR" || currency === "AUD" ) {
        this.payment.createPaypalPayment(create_payment_json, reply);
      }
      else {
        var braintreePay = new BraintreePayment();
        braintreePay.createBraintreePayment(create_payment_json, reply);
      }
    }
  }
};

