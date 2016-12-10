var userScoreMap = {};
var fs = require("fs");
var score = require('./scores.json');
loadScore();
function loadScore(){
    var length =  score.length;
    for(var i = 0;  i < length; i++){
        var userid = score[i].userid;
        var scoreEntry = score[i].score;
        userScoreMap[userid] = scoreEntry;
    }
    return;
}

// getting the update of user score
app.post('/leaderboardupdate/', function(request, result){
    console.log('POST new score received');
    var user = request.body.userid;
    var score = request.body.addscore;

    if(user in userScoreMap) {
        userScoreMap[user] = addscore;
    } else {
        userScoreMap[user] += addscore;
    }

    fs.writeFile("./scores.json", userScoreMap, function(){

    });

    result.send(JSON.stringify({
        success : true
    }));

});

app.post('/leaderboardrequest/', function(request, result){
    console.log('POST leaderboardrequest received');
    //var user = request.body.userid;
    var requestType = request.body.requestType;

    if(requestType === 'score') {
        var userid = request.body.userid;
        result.send(JSON.stringify({
            score : userScoreMap[userid]
        }));
    }
    else if(requestType === 'leaderboard') {
        var tuples = [];

        for (var key in userScoreMap) tuples.push([key, userScoreMap[key]]);

        tuples.sort(function(a, b) {
            a = a[1];
            b = b[1];

            return a < b ? -1 : (a > b ? 1 : 0);
        });

        for (var i = 9; i >= 0; i--) {
            var user = tuples[i][0];
            var score = tuples[i][1];

            result.send(JSON.stringify({
                user: user,
                score : score
            }));
        }
    }

});
