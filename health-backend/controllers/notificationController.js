const { getNotifications, markNotificationAsRead } = require('../models/notificationModel');

// Controller to fetch notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('controller', id);
    await markNotificationAsRead(id);
    res.status(200).json({ message: 'Notification marked as read.' });
  } catch (error) {
    console.error('Error marking notification as read:', error.message);
    res.status(500).json({ error: 'Failed to mark notification as read.' });
  }
};