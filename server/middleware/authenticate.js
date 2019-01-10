var User = require('./../models/user').User;
//Приватные routs 
var autenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user) {
            return new Promise((resolve, reject) => {
                reject();
            });
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports.autenticate = autenticate;