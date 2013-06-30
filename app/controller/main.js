var path = require('path');

module.exports = {

    index:function (req, res, next){
        res.sendfile(path.resolve('public/index.html'));
    }

};