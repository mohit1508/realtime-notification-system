const express = require('express');
const { getThresholds, updateThreshold } = require('../controllers/thresholdController');

const router = express.Router();
router.put('/update', updateThreshold);
router.get('/', getThresholds);

module.exports = router;