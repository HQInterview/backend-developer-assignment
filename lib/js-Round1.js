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

exports.paypal_invoke = function(request, reply) {
  reply('I did something else!');
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
    path: '/paypal',
    handler: exports['paypal_invoke']
  });

  return server;
};
