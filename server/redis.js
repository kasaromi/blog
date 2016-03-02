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

module.exports = {
    setInfo: setInfo,
    getInfo: getInfo,
    client: client
};
