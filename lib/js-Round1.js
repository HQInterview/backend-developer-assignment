/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var BraintreePayment = require('./BraintreePayment');
var PaypalPayment = require('./PaypalPayment');


var paymentProcessor = {
  // TODO: Enable 'create' from paypal api
  processPaymentRequest: function(create_payment_json, reply) {
    // TODO: handle malformed data
    // TODO: this logic is confusing and error prone, cleanup
    var currency = create_payment_json.transactions[0].amount.currency;
    var payment = new PaypalPayment();
    if(create_payment_json.payer.funding_instruments[0].credit_card.type === "amex" ) {
      if( currency === "USD" ) {
        payment.createPaypalPayment(create_payment_json, reply);
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
        payment.createPaypalPayment(create_payment_json, reply);
      }
      else {
        var braintreePay = new BraintreePayment();
        braintreePay.createBraintreePayment(create_payment_json, reply);
      }
    }
  }
};

exports.paymentProcessor = paymentProcessor;

var paymentServer = {
  create_listener: function(basePath) {
    var Hapi = require('hapi');

    var server = new Hapi.Server();
    server.connection({ port: 3000 });
    server.connection({ port: process.env.PORT });

    server.route({
      method : "GET",
      path : '/{param*}',
      handler : {
        directory : {
          path : basePath + '/public',
      listing : true
        }
      }
    });

    server.route({
      method : "GET",
      path : '/bootstrap/{param*}',
      handler : {
        directory : {
          path : basePath + '/node_modules/bootstrap',
      listing : true
        }
      }
    });

    server.route({
      // TODO: remove GET from list
      method: ['GET','PUT', 'POST'],
      path: '/ccpay',
      handler: paymentProcessor.processPaymentRequest
    });

    return server;
  }
};

exports.paymentServer = paymentServer;
