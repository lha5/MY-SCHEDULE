const { Schedule } = require('../models/Schedule');

exports.getMySchedule = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
}

exports.createSchedule = async (req, res, next) => {
  try {
    const data = req.body;
    console.log('...? ', data);

    const newSchedule = new Schedule(data);

    newSchedule.save((err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to save new schedule', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}
