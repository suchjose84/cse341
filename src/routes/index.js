const routes = require('express').Router();
const contacts = require('./contacts');

routes.use('/', require('./swagger'));
routes.use('/contacts', contacts);
routes.use('/', (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;