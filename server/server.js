'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var inert = require('inert');
var vision = require('vision');
var handlebars = require('handlebars');
var good = require('good');
var redis = require('./redis.js');

var plugins = [
    inert,
    vision,
    {register: good,
    options: goodOptions}
];

server.connection({
    port: 3000
});

var goodOptions = {
    reporters: [{
        reporter: require('good-console'),
        events: {response: '*'}
    }]
};

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
        }
    },
    {
        method: 'GET',
        path: '/team',
        handler: function(request, reply) {
            reply.view('team');
        }
    },
    {
        method: 'GET',
        path: '/login',
        handler: function(request, reply) {
            reply.view('login');
        }
    },
    {
        method: 'POST',
        path: '/login/{user*}',
        handler: function(request, reply) {
            console.log('---------' + request.params.user);
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                redirectToSlash: true,
                index: true
            }
        }
    }
]);
});

server.start(function(err) {
    if (err) {
        throw err;
    }
    console.log('Server is running at: ', server.info.uri);
});

module.exports = server;
