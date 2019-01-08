const express = require('express');
// модуль с гитхаба, помогающий распарсить тело ПОСТ запроса
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');    
var {User} = require('./models/user');    
var {Apple} = require('./models/apples');    

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((success)=>{
        res.send(success);
    }, (err)=>{
        res.status(400).send(err);
    });
    // var antonovka = new Apple({
    //     color: 'Red',
    //     weight: 0.3
    // });
    // antonovka.save().then((success) => {
    //     console.log(success);
    // });
});

app.get('/todos', (req, res) => {
    Todo.find().then((success) => {
        res.send({
            todos: success
        });
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET индивидуальные запросы с параметрами
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send('<h1>Your ID is not valid</h1>');
    }else{
        Todo.findById(id).then((todo) => {
            if(!todo) {
                return res.status(404).send('<h1>User with this ID does not exist</h1>');
            }else{
                res.send({
                    todo: todo
                });
            }
        }).catch((e) => {
            console.log(e);
        });
    }
});

app.listen(3000, () => {
    console.log('Connected to the port 3000');
});

module.exports = {
    app: app
};