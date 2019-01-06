//Сначала мы должны запустить монгоДБ сервер для этого в терминале 
//запускаем mongod.exe с параметром пути до каталога 
//С:Program Files/MongoDB/Server/4.0/bin>mongod.exe --dbpath='path'
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
    
    db.collection('CollectionTwo').insertOne({
        text: 'Something else to do',
        status: true
    }, (err, result) => {
        if(err) {
            return console.log('Error: ' + err);
        }
        console.log(JSON.stringify(result.ops));
    });

    client.close();
});