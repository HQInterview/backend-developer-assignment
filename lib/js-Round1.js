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
  reply(false);
  
};

// TODO: Enable 'create' from paypal api
exports.createPaypalPayment = function(createPaymentJson, reply) {
  exports.validateCreatePaymentJson(createPaymentJson,
      function(error) {
        if(error) {
          reply("Payment failed.");
        }
        else {
          if(createPaymentJson.payer.funding_instruments[0].credit_card.type === "visa" ) {
            reply("Visa payment succeeded with paypal.");
          }
          else if(createPaymentJson.payer.funding_instruments[0].credit_card.type === "amex" ) {
            reply("American Express payment succeeded with paypal.");
          }
  //response = paypal.payment.create(createPamentJson,
  //  function(error, payment){}
  //);
        }
      });
};

// TODO: Enable the get from paypal api
exports.getPaypalCreditCard = function(ccid) {
//  paypal.creditCard.get(
//      ccid,
//      function (error, credit_card) {
//        if (error) {
//          throw error;
//        } else {
//          console.log("Retrieve Credit Card Response");
//          console.log(JSON.stringify(credit_card));
//        }
//      });
  return(ccid);
};

// TODO: Enable 'create' from paypal api
exports.processPaymentRequest = function(createPaymentJson, reply) {
  // TODO: handle malformed data
  if(createPaymentJson.payer.funding_instruments[0].credit_card.type === "amex" ) {
    if( createPaymentJson.transactions[0].amount.currency === "USD" ) {
      exports.createPaypalPayment(createPaymentJson, reply);
    }
    else {
      reply("American Express must be used with US Dollars only.");
    }
  }
  else {
    exports.createPaypalPayment(createPaymentJson, reply);
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
