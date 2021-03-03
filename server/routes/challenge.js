const express = require('express');
const router = express.Router();

const ChallengeContoller = require('../controller/challenge');
const { auth } = require('../middleware/auth');

// -------------------------
//        Calendar
// -------------------------

router.get('/:id', auth, ChallengeContoller.getMyChallenging);

router.get('/', auth, ChallengeContoller.getMyAllChallenge);

router.post('/', auth, ChallengeContoller.createChallenge);

router.patch('/:id', auth, ChallengeContoller.updateMyChallenging);

module.exports = router;