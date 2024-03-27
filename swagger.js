const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Eggs and More',
    description: 'Trading API'
  },
  host: 'cse341-mw5a.onrender.com',
  schemes: ['https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Provide options when calling swaggerAutogen
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await require('./server.js');
});
