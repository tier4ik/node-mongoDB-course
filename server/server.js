const express = require('express');
// модуль с гитхаба, помогающий распарсить тело ПОСТ запроса
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');    
var {User} = require('./models/user');    

var app = express();

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((success)=>{
        res.send(success);
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Connected to the port 3000');
});

module.exports = {
    app: app
};