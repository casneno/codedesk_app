const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: String,
  content: String,
  favorite: Boolean,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'PostIt' 
  }],
}, {
  timestamp: true,
});

module.exports = mongoose.model('PostIt', postSchema);