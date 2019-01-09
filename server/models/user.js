const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
// Кастомный метод для генерации токена при создании нового юзера
UserSchema.method('toJSON', function() {
    var userObj = this.toObject();
    return _.pick(userObj, ['_id', 'email']);
});

UserSchema.method('generateAuthToken', function() {
    var access = 'auth';
    var token = jwt.sign({_id: this._id.toHexString(), access}, 'qwerty').toString();

    this.tokens = this.tokens.concat([{
        access: access,
        token: token
    }]);

    return this.save().then((success) => {
        return token;
    });
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};