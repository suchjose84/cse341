//require the express package
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./src/db/connect');
const contactsRoute = require('./src/routes/contacts');

//create the express application by calling the express()
const app = express();

//create the port number to 3000
const port = 3000;

// this is an express middleware function, this middleware function is responsible for routing 
// incoming requests to the appropriate middleware functions based on the URL path of the request.
// app.use('/', require('./src/routes'));

app.use(bodyParser.json()).use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use('/', contactsRoute);

/*
app.listen() is a method in Express.js that starts a server and listens for incoming requests on a specified port number.
In this code, the process.env.port variable is checked first, and if it is defined, it is used as the port number to listen on. This allows the server to use an environment variable for the port number, which can be useful in certain deployment scenarios where the port number might need to be dynamically assigned.
If process.env.port is not defined, then the port variable is used as the default port number.
*/
// app.listen(process.env.port || port);
// // console log the port number
// console.log('Web Server is listening at port '+ (process.env.port || port));

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
});