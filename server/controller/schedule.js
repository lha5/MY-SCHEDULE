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
    console.log('?????????? ', data);

    if (data) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    next(error);
  }
}
