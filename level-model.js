const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  number: {
    type: Number,
    required: true
  },
  items: {
    type:[String]
  }
});


module.exports = mongoose.model('Level', LevelSchema);