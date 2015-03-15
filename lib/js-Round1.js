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

exports.paypal_invoke = function(request, reply) {
  reply('I did something else!');
};

exports.braintree = function() {
  throw new Error("Not Implemented.");
};

exports.create_listener = function() {
  var Hapi = require('hapi');

  var server = new Hapi.Server();
  server.connection({ port: 3000 });
  server.connection({ port: process.env.PORT });

  server.route({
    method : "GET",
    path : '/{param*}',
    handler : {
      directory : {
        path : 'public',
        listing : true
      }
    }
  });

  server.route({
    method : "GET",
    path : '/bootstrap/{param*}',
    handler : {
      directory : {
        path : 'node_modules/bootstrap',
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

//  server.route({
//    method: 'POST',
//    path: '/quote',
//    config: {
//      handler: function(req, reply) {
//        var inVal = { text: req.payload.text };
//        reply(inVal);
//      },
//      validate: {
//        payload: {
//          author: Hapi.types.String().required(),
//          text: Hapi.types.String().required()
//        }
//      }
//    }
//  });
  return server;
};
