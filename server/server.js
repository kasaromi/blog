'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var inert = require('inert');
var vision = require('vision');
var handlebars = require('handlebars');
var bcrypt = require('bcrypt');
var basic = require('hapi-auth-basic');
var good = require('good');
var redis = require('./redis.js');

var plugins = [
    inert,
    vision,
    basic,
    {register: good,
    options: goodOptions}
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
    server.auth.strategy('simple', 'basic', {validateFunc: validate});
    server.route([{
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            redis.getKeys(function(r){
                // console.log(r);//[123,435,567];
                var arrOfObjects = [];
                    redis.getAllPosts(function(rep){
                        arrOfObjects = rep;
                        console.log(arrOfObjects);
                        reply.view('home', {blah: arrOfObjects});
                });
            });
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
        method: 'POST',
        path: '/admin/{post*}',
        handler: function(request, reply) {
            var date = 'date' + Date.now();
            var obj = {};
            var arr = request.params.post.split('title=')[1].split('&postArea=');
            obj.titl = arr[0];
            obj.post = arr[1];
            obj.author = 'author';
            obj.time = date;
            redis.setPost(date, obj);
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
