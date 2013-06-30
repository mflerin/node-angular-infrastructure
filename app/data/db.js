//http://stackoverflow.com/questions/13980236/does-mongodb-have-reconnect-issues-or-am-i-doing-it-wrong
//reworked to try solve connection issues with mongolab

var config = require('../config/config.global.js');
var mongoose = require( 'mongoose' );

var connectionString = config.db.uri;

var MONGO = {
    options: {
        server:{
            auto_reconnect: true,
            socketOptions:{
                connectTimeoutMS:3600000,
                keepAlive:3600000,
                socketTimeoutMS:3600000
            }
        }
    }
};

module.exports = mongoose.connect(connectionString, MONGO.options);