/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strinct';

var PaymentServer = require('./lib/PaymentServer.js');

var payServer = new PaymentServer();
var server = payServer.create_listener('.');

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
