/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

exports.retrieve_token = function() {
  throw new Error("Not Implemented.");
};

// TODO: fix the confusing reply true/false meaning
exports.validateCreatePaymentJson = function(createPaymentJson, reply) {
  process.nextTick( function() {
    reply(false);
  });
  
};

// TODO: Enable 'create' from braintree api
exports.createBraintreePayment = function(createPaymentJson, reply) {
  exports.validateCreatePaymentJson(createPaymentJson,
      function(error) {
        if(error) {
          process.nextTick( function() {
            reply("Payment failed.");
          });
        }
        else {
          var cc_type = createPaymentJson.payer.funding_instruments[0].credit_card.type;
          if(cc_type === "visa" ) {
            process.nextTick( function() {
              reply("Visa payment succeeded with braintree.");
            });
          }
          else if(cc_type === "amex" ) {
            process.nextTick( function() {
              reply("American Express payment succeeded with braintree.");
            });
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

// TODO: Enable 'create' from paypal api
exports.createPaypalPayment = function(createPaymentJson, reply) {
  exports.validateCreatePaymentJson(createPaymentJson,
      function(error) {
        if(error) {
          process.nextTick( function() {
            reply("Payment failed.");
          });
        }
        else {
          var cc_type = createPaymentJson.payer.funding_instruments[0].credit_card.type;
          if(cc_type === "visa" ) {
            process.nextTick( function() {
              reply("Visa payment succeeded with paypal.");
            });
          }
          else if(cc_type === "amex" ) {
            process.nextTick( function() {
              reply("American Express payment succeeded with paypal.");
            });
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

// TODO: Enable 'create' from paypal api
exports.processPaymentRequest = function(createPaymentJson, reply) {
  // TODO: handle malformed data
  // TODO: this logic is confusing and error prone, cleanup
  var currency = createPaymentJson.transactions[0].amount.currency;
  if(createPaymentJson.payer.funding_instruments[0].credit_card.type === "amex" ) {
    if( currency === "USD" ) {
      exports.createPaypalPayment(createPaymentJson, reply);
    }
    else {
      process.nextTick( function() {
        reply("American Express must be used with US Dollars only.");
      });
    }
  }
  else {
    if( currency === "USD" || currency === "EUR" || currency === "AUD" ) {
      exports.createPaypalPayment(createPaymentJson, reply);
    }
    else {
      exports.createBraintreePayment(createPaymentJson, reply);
    }
  }
};

exports.braintree = function() {
  throw new Error("Not Implemented.");
};

exports.create_listener = function(basePath) {
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
    handler: exports['processPaymentRequest']
  });

  return server;
};
