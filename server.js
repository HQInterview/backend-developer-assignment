/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strinct';

var PaymentServer = require('./lib/PaymentServer.js');

var logger = require('./lib/logger.js');

var payServer = new PaymentServer('.', process.env.port || 3000);
var server = payServer.create_listener();

server.start(function() {
  logger.info('Server running at:', server.info.uri);
});
