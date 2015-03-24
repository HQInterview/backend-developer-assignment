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

//exports.paymentValidator = paymentValidator;

var braintreePayment = {

  createBraintreePaymentInner: function(create_payment_json, reply) {
    var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
    var error;
    process.nextTick( function() {
      reply( error, cc_type + " payment succeeded with braintree.");
    });
  },

  // TODO: Enable 'create' from braintree api
  createBraintreePayment: function(create_payment_json, reply) {
    paymentValidator.validateCreatePaymentJson(create_payment_json,
        function(error, message) {
          if(error) {
            process.nextTick( function() {
              reply(error, message);
            });
          }
          else {
            var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
            if(cc_type === "visa" ) {
              process.nextTick( function() {
                braintreePayment.createBraintreePaymentInner(create_payment_json, reply);
              });
            }
            else if(cc_type === "amex" ) {
              process.nextTick( function() {
                braintreePayment.createBraintreePaymentInner(create_payment_json, reply);
              });
            }
    //response = paypal.payment.create(createPamentJson,
    //  function(error, payment){}
    //);
          }
        });
  }
};

exports.braintreePayment = braintreePayment;


exports.createPaypalPaymentInner = function(create_payment_json, reply) {
  var paypal = require('paypal-rest-sdk');
  // TODO: remove this dummy reference to shut-up warning.
  paypal = null;

  //paypal.payment.create(create_payment_json, function (error, payment) {
  //  if (error) {
  //    throw error;
  //  } else {
  //    console.log("Create Payment Response");
  //    console.log(payment);
  var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
  var error = null;
  reply( error, cc_type + " payment succeeded with paypal.");
  //  }
  //});
};

// TODO: Enable 'create' from paypal api
exports.createPaypalPayment = function(create_payment_json, reply) {
  paymentValidator.validateCreatePaymentJson(create_payment_json,
      function(error, message) {
        if(error) {
          process.nextTick( function() {
            reply(error, message);
          });
        }
        else {
          var cc_type = create_payment_json.payer.funding_instruments[0].credit_card.type;
          if(cc_type === "visa" ) {
            process.nextTick(function() {
              exports.createPaypalPaymentInner(create_payment_json, reply);
            });
          }
          else if(cc_type === "amex" ) {
            process.nextTick( function() {
              exports.createPaypalPaymentInner(create_payment_json, reply);
            });
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

// TODO: Enable 'create' from paypal api
exports.processPaymentRequest = function(create_payment_json, reply) {
  // TODO: handle malformed data
  // TODO: this logic is confusing and error prone, cleanup
  var currency = create_payment_json.transactions[0].amount.currency;
  if(create_payment_json.payer.funding_instruments[0].credit_card.type === "amex" ) {
    if( currency === "USD" ) {
      exports.createPaypalPayment(create_payment_json, reply);
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
      exports.createPaypalPayment(create_payment_json, reply);
    }
    else {
      braintreePayment.createBraintreePayment(create_payment_json, reply);
    }
  }
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
