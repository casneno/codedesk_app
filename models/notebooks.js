const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notebookSchema = new Schema({
  title: String,
  description: String,
  favorite: Boolean,
  chapters: [{
    type: Schema.Types.ObjectId,
    ref: 'Chapter' 
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notebook', boardSchema);