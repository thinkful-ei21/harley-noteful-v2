'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});
  
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex
    .select('tags.id', 'name')
    .from('tags')
    .where('tags.id', id)
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
  if ('name' in req.body) {
    updateObj['name'] = req.body.name;
  } else {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err); 
  }
    
  knex('tags')
    .where('tags.id', id)
    .update(updateObj)
    .returning(['tags.id', 'name'])
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex('tags')
    .where('tags.id', id)
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;