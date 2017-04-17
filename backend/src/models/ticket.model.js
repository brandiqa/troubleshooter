'use strict';

// ticket-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const ticket = new mongooseClient.Schema({
    issues: { type: Array, ref:'issue', required: true },
    status: { type: String, required: true, default:'new' },
    assignedTo: {type: mongooseClient.Schema.ObjectId, ref:'user', required: true},
    comments: { type: Array, required: false},
    logs: { type: Array, required: false},
    createdAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('ticket', ticket);
};
