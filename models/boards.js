const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: String,
  position: Number,
  description: String,
  favorite: Boolean,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'PostIt' 
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Board', boardSchema);