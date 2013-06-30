var fs = require('fs')
    , express = require('express')
    , logger = require('./log/logger');

exports.bootstrap = function (app) {
    bootstrapApis(app);
};

function bootstrapApis(app) {
    fs.readdir(__dirname + '/api', function (err, files) {
        if (err) throw err;
        files.forEach(function (file) {
            bootstrapApi(app, file);
        });
    });
}

function bootstrapApi(app, file) {
    var name = file.replace('.js', '')
        , actions = require('./api/' + name)
        , plural = name + 's' // realistically we would use an inflection lib
        , prefixPlural = '/api/' + plural
        , prefixSingular = '/api/' + name;


    Object.keys(actions).map(function (action) {
        switch (action) {
            case 'many':
                app.get(prefixSingular, actions[action]);
                logger.info('GET: ' + prefixPlural);
                break;
            case 'one':
                app.get(prefixSingular + '/:id', actions[action]);
                logger.info('GET: ' + prefixPlural + '/:id');
                break;
            case 'create':
                app.post(prefixSingular, actions[action]);
                logger.info('POST' + prefixPlural + '/:id');
                break;
            case 'update':
                app.put(prefixSingular + '/:id', actions[action]);
                logger.info('PUT: ' + prefixPlural + '/:id');
                break;
            case 'destroy':
                app.del(prefixSingular + '/:id', actions[action]);
                logger.info('DELETE: ' + prefixPlural + '/:id');
                break;
        }
    });
}

