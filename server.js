//requires
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

/*
The code res.setHeader('Access-Control-Allow-Origin', '*'); sets a header in the HTTP response to allow cross-origin 
resource sharing (CORS). When a web page tries to fetch data from a different domain than the one it's hosted on, 
the browser will, by default, block the request for security reasons. The Access-Control-Allow-Origin header tells 
the browser that the server allows requests from any domain by setting the value to *.
By setting this header, the server is indicating that it's okay for any domain to make requests to it, which can be 
useful in allowing third-party applications to access the server's resources.

*/

app.use(bodyParser.json()).use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}).use('/', contactsRoute);

/*
app.listen() is a method in Express.js that starts a server and listens for incoming requests on a specified port number.
In this code, the process.env.port variable is checked first, and if it is defined, it is used as the port number to listen on. This allows the server to use an environment variable for the port number, which can be useful in certain deployment scenarios where the port number might need to be dynamically assigned.
If process.env.port is not defined, then the port variable is used as the default port number.
*/

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
});