var path = require('path');
var fs = require('fs');
var express = require('express');
var cheerio = require('cheerio');
var Mustache = require('mustache');

var app = express();

// delayed HTML apis
app.get('/ajax-link.html', serveWithDelay('ajax-link.html', 0));
app.get('/d001b.html', serveWithDelay('d001b.html', 20000));
app.get('/d003b.html', serveWithDelay('ajax-link.html', 3000));
app.get('/d004b.html', serveWithDelay('ajax-link.html', 3000));
app.get('/d005b.html', serveWithDelay('ajax-link.html', 3000));
app.get('/d006b.html', serveWithDelay('ajax-link.html', 3000));


// static resources
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'pages')));

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
});

// middleware to serve an HTML resource with a delay
// and also handling an AJAX content request
function serveWithDelay(uri, delay) {
    return function(req, res, next) {
        fs.readFile(path.join(__dirname, 'pages', uri), 'UTF-8', function(err, content) {
            setTimeout(function() {
                
                // parse placeholders
                function send(content) {
                    res.send(Mustache.render(content, {
                        'random-gif' : randomGif()
                    }));
                }

                if (req.xhr) {
                    var $ = cheerio.load(content);
                    send($('#content').html());
                } else {
                    send(content);
                }
            }, delay);
        });
    };
}


function randomGif() {
    var gifs = fs.readdirSync(path.join(__dirname, 'pages', 'gifs'));
    return ['gifs', randomItem(gifs)].join('/');
}

function randomItem(list) {
    return list[Math.floor(Math.random()*list.length)];
}
