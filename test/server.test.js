var tape = require('tape');
var server = require('../server/server.js');

tape("home page responds with 200 status", function(t){
    server.inject( {method: 'GET', url: '/'}, function(response) {
        t.equal( response.statusCode, 200, "Checks home page code is 200");
        t.end();
    });
});

tape('team page responds with 200 status', function(t) {
    server.inject({method: 'GET', url: '/team'}, function(response) {
        t.equal(response.statusCode, 200, 'Checks team page code is 200');
        t.end();
    });
});

tape('teardown', function(t) {
    server.stop();
    t.end();
});
