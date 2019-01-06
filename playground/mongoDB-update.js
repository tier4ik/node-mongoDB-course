const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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
    
    //mongoDB update operators  операторы необходимые для апдейта $set, $inc и т.д
    // db.collection('CollectionTwo')
    //     .findOneAndUpdate({
    //             _id: ObjectId('5c31a109490d55b312cd75e0')
    //         }, {
    //         $set: {
    //             status: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((good)=>{
    //         console.log(good);
    //     });

    db.collection('CollectionTwo').findOneAndUpdate({location: 'Volgograd'}, {
        $set: {
            name: 'Maximka'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((good)=>{
        console.log(good);
    });

    client.close();
});