var tape = require('tape');
var server = require('../server/server.js');

tape("home page responds with 200 status", function(t){
    server.inject( {method: 'GET', url: '/'}, function( res ) {
        t.equal( res.statusCode, 200, "checks code is 200");
        t.end();
    });
});
