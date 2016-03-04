var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

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

function setPost(date, obj){
    var title = obj.titl;
    var post = obj.post;
    var author = obj.author;
    var time = obj.time;
    client.hmset(date, 'title', title, 'post', post, 'author', author, 'time', time);
}

function getOnePost (hash, callback){
    client.hgetall (hash, function(err, reply){
        if(err){
            console.log(err);
        }
        else {
            callback(reply);
        }
    });
}

function getAllPosts(callback) {
    var arr = [];
    getKeys(function(r) {
        var arrayOfHashes = r;
        for (var i = 0; i < arrayOfHashes.length+1; i++) {
            getOnePost(arrayOfHashes[i], function(rep){
                if (arr.length === arrayOfHashes.length) {
                    return callback(arr);
                }
                arr.push(rep);
            });
        }
    });
}

function getKeys(callback){
    client.keys('*', function(err, reply){
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
    getOnePost: getOnePost,
    getKeys: getKeys,
    getAllPosts: getAllPosts,
    client: client
};
