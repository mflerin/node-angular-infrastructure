var config = {}

config.db = {};
config.web ={};

config.db.uri = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/localDb';
config.web.port = process.env.PORT || 3000;
config.web.realm = process.env.REALM || 'http://localhost:3000/';

module.exports = config;
