const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api', swaggerUi.serve);
router.get('/api', swaggerUi.setup(swaggerDocument));

module.exports = router;