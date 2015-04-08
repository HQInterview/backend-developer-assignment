/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strict';

var PaymentProcessor = require('./PaymentProcessor.js');
var Joi = require('joi');

function PaymentServer(basePath, connectionPort) {
  this.basePath = basePath;
  this.connectionPort = connectionPort;
}

PaymentServer.prototype =  {
  constructor: PaymentServer,

  create_listener: function() {
    var Hapi = require('hapi');

    var server = new Hapi.Server();
    if( this.connectionPort ) {
      server.connection({ port: this.connectionPort });
    }
    else {
      server.connection({ port: process.env.PORT });
    }

    server.route({
      method : "GET",
      path : '/{param*}',
      handler : {
        directory : {
          path : this.basePath + '/public',
      listing : true
        }
      }
    });

    server.route({
      method : "GET",
      path : '/bootstrap/{param*}',
      handler : {
        directory : {
          path : this.basePath + '/node_modules/bootstrap',
      listing : true
        }
      }
    });

    var payment_schema = Joi.object().keys({
      intent: Joi.string().required(),
      payer: Joi.object().keys({
        payment_method: Joi.string().required(),
        funding_instruments: Joi.object({
          credit_card: Joi.object({
            type: Joi.string().required(),
            number: Joi.string().creditCard().required(),
            expire_month: Joi.string().required(),
            expire_year: Joi.number().integer().required(),
            cvv2: Joi.number().integer().less(999).required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            billing_address: Joi.object({
              line1: Joi.string().required(),
              city: Joi.string().required(),
              state: Joi.string().length(2).required(),
              postal_code: Joi.number().integer().less(99999).required(),
              country_code: Joi.string().length(2).required()
            }).required()
          }).required()
        }).required()
      }).required(),
    }).required();

    var processor = new PaymentProcessor();
    server.route({
      method: ['POST'],
      path: '/ccpay',
      config: {
        handler: function(req, reply) {
          processor.processPaymentRequest(req.payload, reply);
        },
        validate: { payload: payment_schema }
      }
    });

    return server;
  },
};

module.exports = PaymentServer;
