/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentProcessor = require('./PaymentProcessor.js');

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

    var processor = new PaymentProcessor();
    server.route({
      // TODO: remove GET from list
      method: ['GET','PUT', 'POST'],
      path: '/ccpay',
      handler: processor.processPaymentRequest
    });

    return server;
  }
};

exports.paymentServer = paymentServer;
