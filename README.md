## Lab 09 - API server
Implements MongoDB
### Author: Chris Kozlowski

### Links and Resources
* [Submission PR](https://github.com/401-advanced-javascript-cdk/lab09--classes-inheritance-functional-programming/pull/1)
<!-- * [Travis](---) -->
* [Heroku Deployment](https://lab09-401d30.herokuapp.com/api/v1/)
* [Swagger Docs](https://lab09-401d30.herokuapp.com/api-docs/)
* [JSDocs](https://lab09-401d30.herokuapp.com/jsdocs/)

### Modules
#### `server.js`
Contains routes to docs and apiRouter

#### `v1.js`
Contains routes for RESTful actions to the models
#### `models.js`
Defines MongoDB requests for collections as methods using RESTful verbs.
#### `teams-schema.js`  `players-schema.js`
Provides the schema for their collection and makes it available for the model.
#### `players.js` `teams.js`
Extends from model.js for modularity

#### Operation
GET, POST, PUT, and DELETE requests can be made on the Heroku deployment on the /players and /teams routes
Documentation for route operation is located [here](https://lab09-401d30.herokuapp.com/api/v1/api-docs)
