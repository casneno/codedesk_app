const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  favorite: Boolean,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PostIt', postSchema);