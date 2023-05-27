const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/docs-api', swaggerUi.serve);
router.get('/docs-api', swaggerUi.setup(swaggerDocument));

module.exports = router;