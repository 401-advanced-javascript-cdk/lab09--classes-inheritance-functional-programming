'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
 
// Custom Middleware
const errorHandler = require('../middleware/500.js');
const notFoundHandler = require('../middleware/404.js');

// Custom Routes
const apiRouter = require('../routes/v1.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('./public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/jsdocs', (res, req) => {
  res.statusCode(200).send('../out/index.html');
})
// Actual Routes
app.use(apiRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

/**
 * @param  {integer} PORT port number variable from .env
 * @export {server} Exported app module
 */
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

