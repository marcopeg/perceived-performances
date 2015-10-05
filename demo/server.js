var path = require('path');
var fs = require('fs');
var express = require('express');
var cheerio = require('cheerio');
var Mustache = require('mustache');

var app = express();

// delayed HTML apis
app.get('/ajax-link.html', serveWithDelay('ajax-link.html', 0));
app.get('/d001b.html', serveWithDelay('d001b.html', 20000));
app.get('/d003b.html', serveWithDelay('ajax-link.html', 3000, 7000));
app.get('/d004b.html', serveWithDelay('ajax-link.html', 1000));
app.get('/d005b.html', serveWithDelay('ajax-link.html', 2000));
app.get('/d006b.html', serveWithDelay('ajax-link.html', 3000));
app.get('/d008b.html', serveWithDelay('ajax-link.html', 1500));
app.get('/d008c.html', serveWithDelay('ajax-link.html', 1000));
app.get('/d008d.html', serveWithDelay('ajax-link.html', 500));
app.get('/d008e.html', serveWithDelay('ajax-link.html', 250));
app.get('/d008f.html', serveWithDelay('ajax-link.html', 2500));
app.get('/d008g.html', serveWithDelay('ajax-link.html', 800));
app.get('/d008h.html', serveWithDelay('ajax-link.html', 4000));
app.get('/d008i.html', serveWithDelay('ajax-link.html', 5000));
app.get('/f001b.html', serveWithDelay('ajax-link.html', 3000));


// static resources
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'pages')));

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
});

// middleware to serve an HTML resource with a delay
// and also handling an AJAX content request
function serveWithDelay(uri, minDelay, maxDelay) {
    return function(req, res, next) {

        var delay = minDelay;
        if (maxDelay !== undefined) {
            delay = Math.round(randomMinMax(Math.round(minDelay/1000), Math.round(maxDelay/1000))) * 1000;
        }

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
    var gifs = fs.readdirSync(path.join(__dirname, 'pages', 'gifs')).filter(function(fname) {
        return fname.indexOf('chuck-norris') !== -1;
    });
    return ['gifs', randomItem(gifs)].join('/');
}

function randomItem(list) {
    return list[Math.floor(Math.random()*list.length)];
}

function randomMinMax(min, max) {
    var r = min + Math.random()*(max-min);
    return r;
}
