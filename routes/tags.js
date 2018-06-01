'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.post('/', (req, res, next) => {
  const { name } = req.body;
    
  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
    
  knex('tags')
    .insert(newItem)
    .returning(['tags.id', 'name'])
    .then(items => {
      if (items[0]) {
        res.location(`http://${req.headers.host}/notes/${items[0].id}`).status(201).json(items[0]);
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;