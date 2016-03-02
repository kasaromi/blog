'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var inert = require('inert');
var vision = require('vision');
var handlebars = require('handlebars');

var plugins = [
    inert,
    vision
];

server.connection({
    port: 3000
});

server.register(plugins, function(err) {

    server.views({
        engines: {html: handlebars},
        relativeTo: __dirname + '/../',
        path: 'views',
        layout: 'default',
        layoutPath: 'views/layout'
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.view('home');
        },
        method: 'GET',
        path: '/team',
        handler: function(request, reply) {
            reply.view('team');
        }
    }]);
});

server.start(function(err) {
    if (err) {
        throw err;
    }
    console.log('Server is running at: ', server.info.uri);
});
