var db = require('../data/db')
    , User = require('../models/user')
    , Q = require('q');

// api/seeds
// seeds the database with a few demo users.
module.exports = {
    many: function (req, res, next) {
        var counter = 0;
        var users = [];

        for (var i = 0; i < 3; i++) {
            var user = new User();
            user.name = 'user' + i;
            user.age = 10 + i;
            user.email = 'me@me' + i + '.com';
            user.save(function (err, doc) {
                res.json(201, doc);
                users.push(doc);
                if (counter === 2) {
                    res.json(users);
                }
                counter++
            });
        }
    }
}