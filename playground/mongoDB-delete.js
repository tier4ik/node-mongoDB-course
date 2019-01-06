const MongoClient = require('mongodb').MongoClient;
//URL
const url = 'mongodb://localhost:27017';
//Data base Name
const dbName = 'myBase';
//Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});
//Connect to the server
client.connect((err) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successful connect to MongoDB server');
    //
    const db = client.db(dbName);
    // удалить несколько .deleteMany
    // db.collection('CollectionTwo')
    //     .deleteMany({text: 'Eat lunch'})
    //     .then((good)=>{
    //         console.log(good);
    //     }, (bad)=>{
    //         console.log('Error: '+bad);
    //     });

    // удалить один документ .deleteOne
    // db.collection('CollectionTwo')
    //     .deleteOne({text: 'Eat lunch'})
    //     .then((good)=>{
    //         console.log(good);
    //     }, (bad)=>{
    //         console.log('Error: '+bad);
    //     });

    // .findOneAndDelete удаляет 1 документ и возвращаем его 
    db.collection('CollectionTwo')
        .findOneAndDelete({text: 'Eat lunch'})
        .then((good)=>{
            console.log(good.value.text);
        }, (bad)=>{
            console.log('Error: '+bad);
        });

    client.close();
});