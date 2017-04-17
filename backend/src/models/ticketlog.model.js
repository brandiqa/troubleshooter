'use strict';

// ticketlog-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const ticketlog = new mongooseClient.Schema({
    ticket:  {type: mongooseClient.Schema.ObjectId, ref:'ticket', required: true},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('ticketlog', ticketlog);
};
