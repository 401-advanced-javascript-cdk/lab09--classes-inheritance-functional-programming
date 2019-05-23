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
function handleGetAll(req, res, next) {
  req.model.get()
    .then(results => {
      let count = results.length;
      res.json({ count, results });
    })
    .catch(next);
}

function handleGetOne(req, res, next) {
  let _id = req.params._id;
  req.model.get(_id)
    .then(results => res.json(results[0]))
    .catch(next);
}

function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(results => res.json(results))
    .catch(next);
}

function handlePut(req, res, next) {
  let _id = req.params._id;
  req.model.put(_id, req.body)
    .then(results => res.json(results))
    .catch(next);
}

function handleDelete(req, res, next) {
  let _id = req.params._id;
  req.model.delete(_id)
  .then(results => res.json(results))
  .catch(next)
}

module.exports = router;
