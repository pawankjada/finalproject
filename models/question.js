const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const QuestionSchema = new Schema({
  question: {
    type: String,
    body: String,
    answers: Array, 
    solution: String
  }
});

// This creates our model from the above schema, using Mongoose's model method
var Ques = mongoose.model('Question', QuestionSchema);

// Export the Tweet model
module.exports = Ques;