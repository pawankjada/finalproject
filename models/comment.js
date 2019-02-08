const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const CommentSchema = new Schema({
  comment: String
});

// This creates our model from the above schema, using Mongoose's model method
var Comm = mongoose.model('Comment', CommentSchema);

// Export the Tweet model
module.exports = Comm;