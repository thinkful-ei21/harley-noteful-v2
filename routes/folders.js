'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('made it into the router');
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  
  knex
    .select('folders.id', 'name')
    .from('folders')
    .where('folders.id', id)
    .then(items => {
      if (items[0]) {
        res.json(items[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  
  /***** Never trust users - validate input *****/
  const updateObj = {};
  console.log(req.body);
  if ('name' in req.body) {
    updateObj['name'] = req.body.name;
  } else {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err); 
  }
  
  knex('folders')
    .where('folders.id', id)
    .update(updateObj)
    .returning(['folders.id', 'name'])
    .then(items => {
      if (items[0]) {
        res.json(items[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;