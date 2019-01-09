require('./config/config');
const express = require('express');
const _ = require('lodash');
// модуль с гитхаба, помогающий распарсить тело ПОСТ запроса
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');    
var {User} = require('./models/user');    
var {Apple} = require('./models/apples');    

var app = express();
// настройки порта в зависимости от расположения (на сервере или локально)
// Для того чтобы сервер (например HEROCU) знал откуда начинать работу
// пропишем в package.json в объекте script: "start": "node server/server.js"
// также укажем в объекте "engines" версию нашего node "8.11.1"
const port = process.env.PORT;

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

// Для обновления файлов используется метод PATCH, использование методов различного
// типа не принципиально, но является Best Practices в веб разработке
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send('<h1>Your ID is not valid</h1>');
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({
            todo: todo
        });
    }).catch((err) => {
        res.status(400).send();
    });
});
//
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {
        return user.generateAuthToken();
        // res.status(200).send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user); //заголовок хедера начинающийся с "х-" наш собственный
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//
app.listen(port, () => {
    console.log('Connected to the port ', port);
});

module.exports = {
    app: app
};