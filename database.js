const mongoose = require('mongoose');
const dbConnection = 'mongodb://master:jay0914@ds119442.mlab.com:19442/jay';

// Database
const dev_db_url = dbConnection;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
/*
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;*/

class Database {
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect(mongoDB, {useNewUrlParser: true})
            .then(() => {
                console.log('Database connection success')
            })
            .catch(err => {
                console.error(err);
            })
    }
}

module.exports = new Database()