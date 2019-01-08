const ObjectID =require('mongodb').ObjectID;

const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo').Todo;
const User = require('./../server/models/user').User;

var id = '5c3460f1653c872574fe68dd'; //этот id взяли из Robomongo коллекции
var wrongId = '6c3460f1653c872574fe68dd1'; //этот id для демонстрации ошибки

// if(!ObjectID.isValid(wrongId)) {
//     console.log('ID is not valid');
// }
// Todo.find({
//     _id: id //mongoose сам превратит строку id в new ObjectID
// }).then((todos) => {
//     console.log('Our todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Our todo: ', todo);
// });

// Todo.findById(wrongId).then((todo) => {
//     if(!todo) { //ловим ошибку
//         return console.log('ID not found');
//     }
//     console.log('Our todo by ID: ', todo);
// }).catch((err) => {
//     console.log(err);
// });

var userId = '5c31f37ef16a4a25d4f3bdd0';
if(!ObjectID.isValid(userId)) return console.log('User ID is not valid');

User.findById({_id: userId}).then((user) => {
    if(!user) return console.log('User is not here');
    console.log('It is our user: ', user);
}).catch((e) => {
    console.log('Can`t find the user here 8(');
});