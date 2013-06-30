var db = require('../data/db.js');

var Schema = db.Schema;

var UserSchema = new Schema({
    name: String, age: Number, email: String
});

module.exports = db.model('user', UserSchema);