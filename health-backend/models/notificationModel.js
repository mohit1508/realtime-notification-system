const pool = require('./db');

// Fetch all notifications from the database
exports.getNotifications = async () => {
  const query = `
    SELECT 
      id,
      patient_id, 
      patient_name, 
      breached_metrics::json AS metrics, 
      read,
      timestamp
    FROM notifications
    ORDER BY timestamp DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

exports.markNotificationAsRead = async (id) => {
  console.log('model', id);
  const query = `UPDATE notifications SET read = TRUE WHERE id = $1`;
  await pool.query(query, [id]);
};