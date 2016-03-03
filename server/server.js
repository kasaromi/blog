'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var inert = require('inert');
var vision = require('vision');
var handlebars = require('handlebars');
var bcrypt = require('bcrypt');
var basic = require('hapi-auth-basic');

var plugins = [
    inert,
    vision,
    basic
];

server.connection({
    port: 3000
});

var users = {
    rob: "$2a$04$StLQYCBNqRpJeq6fFLluW.dKaijTSaWvMAbekHy9VKDA3Nz6huR5.",
    katherine: "$2a$04$StLQYCBNqRpJeq6fFLluW.dKaijTSaWvMAbekHy9VKDA3Nz6huR5."
};

var validate = function (request, username, password, callback) {
    // var user = users.rob;
    if (!users.hasOwnProperty(username)) { return callback (null, false); }
    bcrypt.compare(password, users[username], function(err, isValid) {
        callback(err, isValid, { username: username });
    });
};

server.register(plugins, function(err) {

    server.views({
        engines: {html: handlebars},
        relativeTo: __dirname + '/../',
        path: 'views',
        layout: 'default',
        layoutPath: 'views/layout'
    });
    server.auth.strategy('simple', 'basic', {validateFunc: validate});
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
    // {
    //     method: "GET",
    //     path: "/admin",
    //     handler: function(request, reply) {
    //         reply.view('admin');
    //     }
    // },
    {
        method: 'get',
        path: '/admin',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply.view('admin');
            }
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
