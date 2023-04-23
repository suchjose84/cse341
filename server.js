const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1');

app.get('/', lesson1Controller.yosemiteRoute);
app.get('/bugs', lesson1Controller.bugsRoute);

const port = 3000;
app.use('/', require('./routes'));

app.listen(process.env.port || port);
console.log('Web Server is listening at port '+ (process.env.port || 3000));