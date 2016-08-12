var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function(req, res) {

    var theSong = req.body;
    var dup = checkDuplicate(theSong.title, theSong.artist);
    var blank = checkBlank(theSong.title, theSong.artist);

    if (dup === false && blank === false) {
        songs.push(theSong);
        res.sendStatus(200);
    } else {
        console.log(dup, blank);
        res.sendStatus(200);
        console.log("was dup or blank");
    }


});

app.get('/songs', function(req, res) {
    res.send(songs);
});

app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';

    console.log('What is in req.params[0]?', req.params[0]);

    //console.log('dirname: ', __dirname);
    //console.log('path', path.join(__dirname, '../public', file));
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function() {
    console.log('Server now running at port ', app.get('port'));
});

function checkBlank(title, artist) {
    if (title === "") {
        return true;
    } else if (artist === "") {
        return true;
    } else {
        return false;
    }

}

function checkDuplicate(title, artist) {
    var truth = false;
    if (songs.length === 0) {
        truth = false;
    } else {
        songs.forEach(function(thisSong, i) {
            if (thisSong.title == title && thisSong.artist == artist) {
                truth = true;
            } else {
                truth = false;
            }
        });
    }
    return truth;
}
