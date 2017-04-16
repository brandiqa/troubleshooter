'use strict';

// category-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const category = new mongooseClient.Schema({
    type: { type: String, required: true }
  });

  return mongooseClient.model('category', category);
};
