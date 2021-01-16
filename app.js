const express = require('express');
const { response } = require('express');
const Joi = require('joi');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


const helmet = require('helmet');
const morgan = require('morgan');

const courses = require('./routes/courses');
app.use('/api/courses',courses);//courses router for all api starting with same endpont


const logger = require('./middleware/logger')

startupDebugger("Enabled debugger")
console.log("App name : " + config.get('name'))
console.log("Mail server: " + config.get('mail.host'))
console.log("Mail password: " + config.get('mail.password'))
dbDebugger("dbDebugger ")

const app = express();
app.use(express.json());//Middleware
app.use(express.urlencoded({extended:true}))//Middleware
app.use(express.static('public'))//
app.use(helmet())//Middleware
app.use(morgan('tiny'))//Middleware

//Template engine
app.set('view engine','pug');
app.set('views','./views');

app.use(logger);

app.get('/', (rq, res) => {
    // res.send('Helloe')
    res.render('index',{title:"My express pug",message:"Hello"})
});
//Dynamic port as per availibility
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))