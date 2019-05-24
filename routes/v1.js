'use strict';

const express = require('express');
const modelFinder = require('../middleware/model-finder.js');
const router = express.Router();

router.param('model', modelFinder);

// Route Definitions
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:_id', handleGetOne);
router.delete('/api/v1/:model/:_id', handleDelete);
router.put('/api/v1/:model/:_id', handlePut);

// Route Handlers

/**
 * Sends get requests to the model for group gets
 * @function handleGetAll
 * @param {object} req - Express request object 
 * @param {object} res - Express response object 
 * @param {function} next - Express next() 
 */

function handleGetAll(req, res, next) {
  req.model.get()
    .then(results => {
      let count = results.length;
      res.json({ count, results });
    })
    .catch(next);
}

/**
 * Sends get requests to the model with the _id from req.params
 * @function handleGetOne
 * @param {object} req - Express request object 
 * @param {object} res - Express response object 
 * @param {function} next - Express next() 
 */

function handleGetOne(req, res, next) {
  let _id = req.params._id;
  req.model.get(_id)
    .then(results => res.json(results[0]))
    .catch(next);
}

/**
 * Sends post requests to the model with req.body
 * @function handlePost
 * @param {object} req - Express request object 
 * @param {object} res - Express response object 
 * @param {function} next - Express next() 
 */
function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(results => res.json(results))
    .catch(next);
}
/**
 * Sends put requests to the model with req.params._id and req.body
 * @function handlePut
 * @param {object} req - Express request object 
 * @param {object} res - Express response object 
 * @param {function} next - Express next() 
 */
function handlePut(req, res, next) {
  let _id = req.params._id;
  req.model.put(_id, req.body)
    .then(results => res.json(results))
    .catch(next);
}

/**
 * Sends delete requests to the model with req.params._id
 * @function handleDelete
 * @param {object} req - Express request object 
 * @param {object} res - Express response object 
 * @param {function} next - Express next() 
 */

function handleDelete(req, res, next) {
  let _id = req.params._id;
  req.model.delete(_id)
  .then(results => res.json(results))
  .catch(next)
}

module.exports = router;
