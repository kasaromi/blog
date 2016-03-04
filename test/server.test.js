var tape = require('tape');
var redis = require('../server/redis.js');
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

tape('admin page responds with 401 status', function(t) {
    server.inject({method: 'GET', url: '/admin'}, function(response) {
        t.equal(response.statusCode, 401, 'Checks admin page code is 401');
        t.end();
    });
});

// tape("does css load", function(t) {
//     server.inject({method: 'GET', url: '/'}, function (res) {
//         console.log(res);
//         t.equal();
//         t.end();
//     });
// });
