
var express = require('express')
    , http = require('http')
    , path = require('path')
    , apiRoutes = require('./apiRoutes')
    , config = require('./config/config.global.js');

var app = express();

//Create session configuration objects
var MongoStore = require('connect-mongo')(express);
var sessionStore = express.session({
    store: new MongoStore({
        url: config.db.uri, maxAge: 300000
    }),
    secret: '1234567890QWERTY'
})


app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('Flerin-Flerin'));
    app.use(sessionStore);
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public/styles' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//app.get('/', routes.index);
apiRoutes.bootstrap(app);

module.exports = app;

