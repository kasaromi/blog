var tape = require('tape');
var redisFunc = require('../server/redis.js');
var server = require('../server/server.js');
var client = redisFunc.client;

client.select(3, function(){
    console.log('database 3 selected');
});

client.flushdb(function(){
    console.log('clears database 3 of previous tests');
});

tape('test can write list to db', function(t){
	const array = ['1', '2', '3', '4', '5'];
	const listName = 'testList';
	client.RPUSH(listName, array);
	client.LRANGE(listName, 0, -1, (error, reply) => {
		t.ok(!error, '- no errors');
		t.deepEqual(reply, array, '- list arrays match!');
		t.end();
	});
});

tape('tests if redis setPost function stores data correctly', function(t){
    var date = 'date'+1234;
    var obj = {};
    obj.time = 1234;
    obj.titl = 'today';
    obj.post = 'went to fac';
    obj.author = 'sam';
    redisFunc.setPost(date, obj);
    client.hgetall('date1234', function(err, reply){
        if(err){throw err;}
        t.equal(reply.title, 'today', '- the title is storing correctly');
        t.equal(reply.post, 'went to fac', '- the posts are storing correctly');
        t.equal(reply.author, 'sam', '- the author is storing correctly');
        t.equal(reply.time, '1234', '- the time is storing correctly');
    });
    client.flushdb(function(){
        console.log('----resets database----');
    });
    client.keys('*', function(err, reply){
        if(err){throw err;}
        t.equal(reply.length, 0, '- db is reset correctly');
        t.end();
    });
});

tape('tests the getOnePost function', function(t){
    console.log('------');
    var date = 'date' + 1234;
    var title = 'today';
    var post = 'went to fac';
    var author = 'sam';
    var time = 1234;
    client.hmset(date, 'title', title);
    redisFunc.getOnePost(date, function(err, reply){
        t.equal(reply, 'hi', 'need help with this one guys!!!');
        t.end();
    });
});

// tape('tests getKeys function', function(t){
//     redisFunc.getKeys(function(){
//
//     });
// });

// tape('teardown', function(t) {
//     // server.stop();
//     client.quit();
//     t.end();
// });
