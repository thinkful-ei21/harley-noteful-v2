'use strict';

const knex = require('../knex');

// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const id = 1;

// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .where('notes.id', id)
//   .then(results => {
//     console.log(JSON.stringify(results[0], null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const updatedItem = {title: 'updated note', content: 'updated content'};

// knex('notes')
//   .where('notes.id', id)
//   .update(updatedItem)
//   .returning(['notes.id', 'title', 'content'])
//   .then(results => {
//     console.log(JSON.stringify(results[0], null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const newItem = {title: 'new note', content: 'new content'};

// knex('notes')
//   .insert(newItem)
//   .returning(['notes.id', 'title', 'content'])
//   .then(results => {
//     console.log(JSON.stringify(results[0], null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const id = 11;

// knex('notes')
//   .where('notes.id', id)
//   .del()
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });
