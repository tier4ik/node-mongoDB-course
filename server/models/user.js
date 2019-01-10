const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//static применяется не к конкретному юзеру, а к модели !!!
UserSchema.static('findByToken', function(token) {
    var UserModel = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'qwerty');
    }catch(e){
        return new Promise((resolve, reject) => {
            reject();
        });
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
});

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                 next();
            });
        });
    }else{
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};