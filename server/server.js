const express = require('express');
// модуль с гитхаба, помогающий распарсить тело ПОСТ запроса
const bodyParser = require('body-parser');

var mongoose = require('./data_base/mongoose');
var Todo = require('./models/todo').Todo;    
var User = require('./models/user').User;    

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