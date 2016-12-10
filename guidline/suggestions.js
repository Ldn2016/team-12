var promise = require('promise');
var express = require('express');
var sha2 = require('js-sha256').sha256;
//var redis_client = require('redis').createClient(process.env.REDIS_URL);
var fs = require('fs');
var app = express();
var HTTPRequest = require('request');

var PORT = process.env.PORT || 1140;

var bodyParser = require('body-parser');

/*//INITIAL SETUP
 redis_client.flushdb(function(err, succ){
 console.log(succ);
 });
 redis_client.set(key, value, function(err, succ){
 console.log(succ);
 });
 //END OF INITIAL SETUP*/

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var RecentlyUSed = {};

app.post('/lastUsed/', function(request, result){
    console.log('POST LastUsed requested');
    var user = request.body.userid;
    var url = RecentlyUSed[user];
    result.send(JSON.stringify({
        "url" : url
    }));
});

app.post('/addLastUsed', function(request, result){
    console.log('Post AddLastUsed received');
    var user = request.body.userid;
    var url = request.body.url;
    userScoreMap[user] = url;
    result.send(JSON.stringify({
        success : true
    }))
});



app.get('/exercises', function (request, result) {
    var user = request.body.user;
    //TODO : request dynamic with user to baselevel
    var baseLevel = "http://198.199.112.173:8008/api/topic_tree/khan?parent=addition-subtraction";
    var acc = [];
    HTTPRequest(baseLevel, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            var taskList = JSON.parse(body);
            var taskLength = taskList.length;
            for (var j = 0; j < taskLength; j++) {
                var exeReq = taskList[j].path;
                acc.push(formList(j, exeReq, taskList));

                if (j == taskLength - 1){
                    Promise.all(acc).then(function (res) {
                        result.send(JSON.stringify(res));
                    });
                }

            }
        }

    });
});


function formList(j, exeReq, taskList) {
    return new Promise(function (resolve, rej) {
        var arr = exeReq.split('/');
        var endp = arr[arr.length - 2];
        HTTPRequest('http://198.199.112.173:8008/api/topic_tree/khan?parent=' + endp, function (err, results, bodyInner) {
            var list = [];
            if (!err && results.statusCode == 200) {
                var listJson = JSON.parse(bodyInner);
                var length = listJson.length;
                for (var i = 0; i < length; i++) {
                    //TODO: implement with database
                    var path = listJson[i].path.split('/');
                    var endp = path[path.length -2];
                    list.push({
                        "title": listJson[i].title,
                        "completed": false,
                        "progress": 0,
                        "recommendation": 0,
                        "url": 'http://198.199.112.173:8008/api/topic_tree/khan?parent=' + endp,
                        "score": Math.floor((Math.random() * 10) + 1),
                });
                }
            }
            var returns = {"name": taskList[j].title, "tasks": list, "recommendation": 0};
            resolve(returns);
        }), function (err, res) {
            if (err) rej(res);
            else
                resolve(res);
        };
    });
}