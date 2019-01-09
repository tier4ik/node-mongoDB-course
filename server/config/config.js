var env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/myBase';
}else if(env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = 'mongodb://localhost:27017/myBaseTest';
}
