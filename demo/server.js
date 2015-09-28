var path = require('path');
var fs = require('fs');
var express = require('express');
var cheerio = require('cheerio');

var app = express();

// veeeery slow and painful loading experience (with chuck norris)
app.get('/d001b.html', serveWithDelay('d001b.html', 2000));

// delayed ajax requests
app.get('/p2.html', serveWithDelay('ajax-link.html', 1));
app.get('/p2-fast.html', serveWithDelay('ajax-link.html', 800));
app.get('/p2-slow.html', serveWithDelay('ajax-link.html', 3000));
app.get('/p2-death.html', serveWithDelay('ajax-link.html', 10000));

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
                if (req.xhr) {
                    var $ = cheerio.load(content);
                    res.send($('#content').html());
                } else {
                    res.send(content);
                }
            }, delay);
        });
    };
}
