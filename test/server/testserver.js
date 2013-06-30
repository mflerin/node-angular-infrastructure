/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , config = require('../../app/config/config.global.js')
    , app = require('../../app/express-config');

app.set('port', process.env.PORT || 3015);

//Function Copied from the we to work out if the server is already up and running on this port
//If it is then don't try restart.
var isPortTaken = function (PORT, callback) {
    var net = require('net');
    var tester = net.createServer();
    tester.once('error', function (err) {
        if (err.code == 'EADDRINUSE') {
            callback(true)
        } else {
            callback(err)
        }
    });
    tester.once('listening', function () {
        tester.once('close', function () {
            callback(false)
        })
        tester.close()
    });
    tester.listen(PORT)
};

isPortTaken(3015, function (isTaken) {
    if (!isTaken) {
        http.createServer(app).listen(app.get('port'), function () {
            console.log("Express server listening on port " + app.get('port'));
        });
    }
});

module.exports = app;

