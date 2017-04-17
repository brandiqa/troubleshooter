'use strict';

// issue-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const issue = new mongooseClient.Schema({
    category: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    urgency: { type: String, required: true, default: 'low' },
    status: { type: String, required: true, default: 'new' },
    postedBy: { type: mongooseClient.Schema.ObjectId, ref:'user', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('issue', issue);
};
