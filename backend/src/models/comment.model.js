'use strict';

// comment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const comment = new mongooseClient.Schema({
    ticket:  {type: mongooseClient.Schema.ObjectId, ref:'ticket', required: true},
    content: { type: String, required: true },
    postedBy: {type: mongooseClient.Schema.ObjectId, ref:'user', required: true},
    createdAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('comment', comment);
};
