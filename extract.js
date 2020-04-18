
var path = require('path');

var extractFilePath = function (url) { //takes in requested url
    var filePath;
    var fileName = 'index.html';

    if (url.length > 1) {
        fileName = url.substring(1);   // Gets Rid of '/' 
    }
    console.log('The fileName is: ' + fileName);
    
    // Gets full path for the requested file
    filePath = path.resolve(__dirname, 'app', fileName);
    return filePath;
};

module.exports = extractFilePath;