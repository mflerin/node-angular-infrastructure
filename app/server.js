var express = require('express')
    , http = require('http')
    , path = require('path')
    , config = require('./config/config.global')
    , user = require('./api/user')
    , app = require('./express-config')
    , main=require('./controller/main');


app.set('port', process.env.PORT || 3000);

app.get('/', main.index);


process.on('uncaughtException', function (err) {
    console.log( "UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

