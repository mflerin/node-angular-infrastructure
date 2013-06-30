var db = require('../../app/data/db')
    , User = require('../../app/models/user')
    , request = require('supertest')
    , app = require('./testserver')
    , should = require('../../app/node_modules/chai/lib/chai').should()
    , databaseHelper = require('./databaseHelper')(db)
    , Q = require('../../app/node_modules/q/q');


//ref: http://thewayofcode.wordpress.com/tag/supertest/

describe('Should perform CRUD operations through api', function () {

    beforeEach(function (done) {
        databaseHelper.dropAllCollections(function () {
            done();
        });
    });

    it('ONE by Id', function (done) {

        databaseHelper.createUser("User 101", 22).done(function (data) {
            request(app)
                .get('/api/user/' + data._id)
                .expect(200)
                .end(function (err, response) {
                    if (err) throw err;
                    response.body.name.should.equal('User 101');
                    done();
                }
            );
        });
    });

        it('GET ALL', function (done) {

            databaseHelper.createUser("User1", 22)
                .then(databaseHelper.createUser("User2", 33))
                .then(databaseHelper.createUser("User3", 34))
                .done(function (data) {
                    request(app)
                        .get('/api/users')
                        .expect(200)
                        .end(function (err, response) {
                            if (err) throw err;
                            response.body.should.have.length(3);
                            done();
                        });
                });
        });

        it('CREATE', function (done) {

            var user = {name: 'user 10', age: 50, email: 'me@me.com'};

            request(app)
                .post('/api/user')
                .expect(201)
                .send(user)
                .end(function (err, response) {
                    if (err) {
                        throw err
                    }
                    var savedUser = response.body;
                    savedUser.name.should.equal(user.name);
                    savedUser.age.should.equal(user.age);
                    savedUser.email.should.equal(user.email);
                    savedUser._id.length.should.be.greaterThan(0);
                    done();
                });
        });


        it('UPDATE', function (done) {

            var id = '';

            databaseHelper.createUser("User1", 22)
                .then(function (data) {
                    var deferred = Q.defer();

                    data.name = 'UPDATED';
                    id = data._id;

                    request(app)
                        .put('/api/user/' + id)
                        .send(data)
                        .expect(204)
                        .end(function (err, response, data) {
                            if (err) throw err;
                            deferred.resolve(id);
                        });
                    return deferred.promise;
                })
                .then(function () {
                    return databaseHelper.findUserById(id);
                })
                .then(function (user) {
                    user.name.should.equal('UPDATED');
                }).done(function () {
                    done();
                });
        });

        it('DELETE', function (done) {
            databaseHelper.createUser("User1", 22)
                .then(function (data) {
                    var deferred = Q.defer();
                    request(app)
                        .del('/api/user/' + data._id)
                        .expect(204)
                        .end(function (err, response) {
                            if (err) throw err;
                            deferred.resolve(data._id);
                        });

                    return deferred.promise;
                })
                .done(function (data) {
                    databaseHelper.findUserById(data).then(
                        function (retrievedUser) {
                            should.not.exist(retrievedUser);
                            done();
                        }
                    );
                });
        });
    });
