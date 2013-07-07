var db = require('../data/db')
    , User = require('../models/user')
    , logger = require('../log/logger')
    , Q = require('q');

module.exports = {

    many: function (req, res, next) {
        User.find({}, {}, {limit: 10,sort: [['_id', -1]]}, function (err, docs) {
            res.json(docs);
        });
    },

    one: function (req, res, next) {
        var id = req.params.id;
        User.findOne({_id: id}, function (err, doc) {
            res.json(doc);
        });
    },

    create: function (req, res, next) {
        var user = new User(req.body);
        user.save(function (err, docs) {
            res.json(201, docs);
        });
    },

    update: function (req, res, next) {
        var id = req.params.id;
        Q.fcall(function () {
            var deferred = Q.defer();

            User.findOne({_id: id}, function (err, doc) {
                deferred.resolve(doc);
            });
            return deferred.promise;
        }).then(function (user) {
                var deferred = Q.defer();
                user.name = req.body.name;
                user.age = req.body.age;
                user.email = req.body.email;
                user.save(function (err, doc) {
                    deferred.resolve(doc);
                    res.send(204, {});
                });
                return deferred;
            }).done();
    },

    destroy: function (req, res, next) {
        var id = req.params.id;
        User.findOne({_id: id}, function (err, doc) {
            doc.remove();
            res.send(204);
        });
    }

}
