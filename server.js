//requires
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./src/db/connect');
const contactsRoute = require('./src/routes/contacts');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const port = 3000;

// app.use(bodyParser.json()).use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// }).use('/', contactsRoute);
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({
    extended: true
  }))
  .use('/', require('./routes'));

const db = require('./models');

// mongodb.initDb((err, mongodb) => {
//     if (err) {
//       console.log(err);
//     } else {
//       app.listen(port);
//       console.log(`Connected to DB and listening on ${port}`);
//     }
// });

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});