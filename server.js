/*
 * js-Round1
 * https://github.com/HQInterview/Nodejs-Round1
 *
 * Copyright (c) 2015 Michael Bowerman
 * Licensed under the GPL license.
 */

'use strinct';

var js_Round1 = require('./lib/js-Round1.js');

var server = js_Round1.create_listener('.');

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
