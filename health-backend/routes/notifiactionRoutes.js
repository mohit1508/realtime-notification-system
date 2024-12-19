const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

const router = express.Router();
router.put('/:id/read', markAsRead);
router.get('/', getNotifications);

module.exports = router;