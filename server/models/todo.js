const mongoose = require('mongoose');
// определяем шаблон по которому будут добавляться новые документы
// документы для добавления будут объявляться через new <имя шаблона>

// mongoose.model - СОЗДАЕТ НОВУЮ !!! КОЛЛЕКЦИЮ с таким же названием только,
// первая буква маленькая и на конце добавляется '-s'
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};