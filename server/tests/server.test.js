const request = require('supertest');
const expect = require('chai').expect;
const ObjectID = require('mongodb').ObjectID;


var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});


describe('POST /todos', ()=>{
   it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text: text}) // супертест сам переконвертирует объект в JSON формат
            .expect(200)
            .expect((res)=>{ // кастомный expect принимает аргументом объект response
                expect(res.body.text).to.equal(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text: text}).then((todos)=>{
                    expect(todos.length).to.equal(1);
                    expect(todos[0].text).to.equal(text);
                    done();
                }).catch((err)=>{
                    done(err);
                });
            });
   }) ;
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).to.equal(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).to.equal(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString(); 

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404, done);
    });

    it('should return 404 for non-valid id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404, done)
    });
});