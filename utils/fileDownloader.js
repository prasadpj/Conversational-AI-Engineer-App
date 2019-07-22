const http = require('http');
const fs = require('fs');
const fileSource = 'http://norvig.com/big.txt';
const filePath = 'files/sample.txt'; // since we know the file is txt format currently hardcoding the file name and extension.

module.exports = (callback) => {
    const file = fs.createWriteStream(filePath);
    const request = http.get(fileSource, (response) => {
        if (response.statusCode !== 200) {
            return callback('Response Message was ' + response.statusMessage);
        }
        response.pipe(file);
    });

    //call cb after close completes
    file.on('finish', () => {
        file.close(callback);
    })
    
    // check for request error too
    request.on('error', (err) => {
        fs.unlink(dest);
        return callback(err.message);
    });

    file.on('error', (err) => {
        fs.unlink(filePath); // Delete the file in case of error
        return callback(err.message);
    });
};
