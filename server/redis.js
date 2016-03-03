var redis = require('redis');
var client = redis.createClient();

function setInfo(name, password){
    client.set(name, password);
}

function getInfo(name, callback){
    client.get(name, function(err, reply){
        if(err){
            console.log(err);
        }
        else{callback(reply);}
    });
}

function setPost(cli, title, post, author){
    var obj = {};
    obj.title = title;
    obj.post = post;
    obj.author = author;
    client.hset(cli, Date.now(), obj);
}

function getPosts(cli, callback){
    client.hgetall(cli, function(err, reply){
        if(err){
            console.log(err);
        }
        else{callback(reply);}
    });
}

module.exports = {
    setInfo: setInfo,
    getInfo: getInfo,
    setPost: setPost,
    getPosts: getPosts,
    client: client
};
