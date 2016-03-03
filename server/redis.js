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

function setPost(obj){
    var date = 'date' + obj.date;
    var title = obj.titl;
    var post = obj.post;
    var author = obj.author;
    client.hmset(date, 'title', title, 'post', post, 'author', author);
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
        // console.log(r);
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
    // console.log("string 2", arr);
}

// getAllPosts(function(data) {
//     console.log(data);
// });

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
