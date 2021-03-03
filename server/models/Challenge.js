const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  memo: {
    type: String
  },
  goal: {
    type: Number
  },
  done: {
    type: Array
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  },
  deadline: {
    type: Boolean
  }
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = { Challenge };
