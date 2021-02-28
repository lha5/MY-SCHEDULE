const express = require('express');
const router = express.Router();

const scheduleController = require('../controller/schedule');

// -------------------------
//        Schedule
// -------------------------

router.get('/', scheduleController.getMySchedule);

router.post('/', scheduleController.createSchedule);

module.exports = router;
