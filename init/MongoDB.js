const mongoose = require('mongoose');
const { connectionUrl } = require('../config/keys')

const connectMongoDb = async () => {
    try {
       await mongoose.connect(connectionUrl).then(() => console.log('Database connection successful'))
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectMongoDb;