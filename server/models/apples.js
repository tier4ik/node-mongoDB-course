const mongoose = require('mongoose');

var Apple = mongoose.model('Apple', {
    color: {
        type: String
    },
    weight: {
        type: Number
    }
});

module.exports = {
    Apple
};