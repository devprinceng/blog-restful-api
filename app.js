const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();
const { authRouter } = require('./routes')
const connectMongoDb = require('./init/MongoDB');
const morgan = require('morgan')
const {errorHandler} = require('./middlewares')
//connect database
connectMongoDb();

//* initialize app
const app = express()

//use thirdparty middlewares
app.use(express.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit:'500mb',extended:true}));
app.use(morgan('dev'))
//error handling middlewares
app.use(errorHandler);
//routes
app.use('/api/v1/auth/', authRouter)

module.exports = app;