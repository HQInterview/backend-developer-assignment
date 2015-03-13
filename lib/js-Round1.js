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

exports.paypal = function() {
  throw new Error("Not Implemented.");
};


exports.braintree = function() {
  throw new Error("Not Implemented.");
};

exports.create_listener = function() {
  var Hapi = require('hapi');

  var server = new Hapi.Server();
  server.connection({ port: 3000 });

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
