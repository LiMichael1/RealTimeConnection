// Access HTTP module
var http = require('http');
// Access filesystem module
var fs = require('fs');
// Extract.js
var extract = require('./extract');
// Dynamic Mime Types
const mime = require('mime');
// Web Socket Server
var wss = require('./websockets-server');

var handleError = function (err, res) {
    res.writeHead(404);
    
    var errorPath = extract('/404.html');

    fs.readFile(errorPath, function(err, data) {
        res.end(data);
    })
};

// Handles HTTP requests  -> calls function in parameters
var server = http.createServer(function (req, res) {
    console.log('Responding to a request');
    
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {    //returns index.html 
        if (err) {
            handleError(err, res);  //404 NOT FOUND ERROR
            return;
        } else {
            res.setHeader('Content-Type', mime.getType(filePath));      //custom mime type 
            res.end(data);          //200 OK 
        }
    });
});

// Server listen on port 3000
server.listen(3000);