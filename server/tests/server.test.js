const request = require('supertest');
const expect = require('chai').expect;


var {app} = require('./../server');
var {Todo} = require('./../models/todo');

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
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

                Todo.find().then((todos)=>{
                    expect(todos.length).to.equal(1);
                    expect(todos[0].text).to.equal(text);
                    done();
                }).catch((err)=>{
                    done(err);
                });
            });
   }) ;
});