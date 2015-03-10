// Michael Bowerman (c) 2015
var http = require('http');


http.createServer(function(request,response){
        response.end("Hi,The Node server is running and up.");
}).listen(8080);

console.log('Server in running..');
