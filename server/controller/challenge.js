const { Challenge } = require('../models/Challenge');
const moment = require('moment');

exports.createChallenge = async (req, res, next) => {
  try {
    const data = req.body;

    const newChallenge = new Challenge(data);

    newChallenge.save((err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to save new challenge', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

exports.getMyChallenging = async (req, res, next) => {
  try {
    const user = req.user._id;

    const myChallenge = await Challenge.find({ writer: user, dueDate: { $gt: moment() } });

    if (myChallenge) {
      res.status(200).json({ success: true, data: myChallenge });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
}

exports.getMyAllChallenge = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
}

exports.updateMyChallenging = async (req, res, next) => {
  try {
    const user = req.user._id;

    const changeData = req.body;
  } catch (error) {
    next(error);
  }
}
