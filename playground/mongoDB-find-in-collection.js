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
    //чтобы искать по _id внутри find пишем new ObjectID('5c30cc2fc56d2cfcfc8461b3')
    //возвращается new Promise
    db.collection('CollectionOne').find({text: {$exists: true}}).toArray().then((good)=>{
        console.log('Our collection below');
        console.log(good);
    },(bad)=>{
        console.log('Error here: ' + bad);
    });

    client.close();
});