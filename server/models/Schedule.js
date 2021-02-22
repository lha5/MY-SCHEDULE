require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  calendarId: {
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  goingDuration: {
    type: Number
  },
  comingDuration: {
    type: Number
  },
  location: {
    type: Date
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  isReadOnly: {
    type: Boolean,
    default: false
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  },
  color: {
    type: String
  },
  bgColor: {
    type: String
  },
  dragBgColor: {
    type: String
  },
  state: {
    type: String
  }
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Schedule };
