'use strict';

const express = require('express');
const modelFinder = require('../middleware/model-finder.js');
const router = express.Router();

router.param('model', modelFinder);

// Route Definitions
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.delete('/api/v1/:model/:id', handleDelete);
router.put('/api/v1/:model/:id', handlePut);

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
  let id = req.params.id;
  req.model.get(id)
    .then(results => res.json(results[0]))
    .catch(next);
}

function handlePost(req, res, next) {
  req.model.post(req.body)
    .then(results => res.json(results))
    .catch(next);
}

function handlePut(req, res, next) {
  let id = req.params.id;
  req.model.put(id, req.body)
    .then(results => res.json(results))
    .catch(next);
}

function handleDelete(req, res, next) {
  let id = req.params.id;
  req.model.delete(id)
  .then(results => res.json(results))
  .catch(next)
}

module.exports = router;
