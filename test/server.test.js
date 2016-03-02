var tape = require('tape');
var server = require('./server.js');

tape("test", function(t){
        t.equal(server.test(5), 10);
        t.end();
});
