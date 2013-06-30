var _ = require('../../app/node_modules/underscore/underscore')
    , User = require('../../app/models/user')
    , Q = require('../../app/node_modules/q/q');

var databaseHelper = function (db) {

    function dropAllCollections(callback) {
        var collections = _.keys(db.connection.collections);
        var collectionLen = collections.length;
        var count = 0;

        _.each(collections, function (collectionName) {
            var collection = db.connection.collections[collectionName];
            collection.drop(function (err) {
                count++;
                if (collectionLen === count) {
                    callback();
                }
            })
        })
    }

    function createUser(name, age) {
        var deferred = Q.defer();

        var user = new User();
        user.name = name;
        user.age = age;

        user.save(function (err, docs) {
            if (err) throw err;
            deferred.resolve(docs);
        });

        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = Q.defer();
        User.findOne({_id:id}, function(err,doc) {
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    return{
        dropAllCollections: dropAllCollections,
        createUser: createUser,
        findUserById:findUserById
    };
}

module.exports = databaseHelper;