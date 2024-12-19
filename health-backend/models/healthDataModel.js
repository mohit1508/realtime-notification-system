const pool = require('./db');

// Fetch all patient health data
// Fetch health data with limit and offset
exports.getHealthData = async (offset, limit) => {
    const query = `
        SELECT p.Patient_ID AS patient_id, 
            p.Name, 
            h.Heart_Rate, 
            h.Blood_Pressure_Systolic, 
            h.Blood_Pressure_Diastolic, 
            h.Temperature, 
            h.SpO2, 
            h.Respiratory_Rate, 
            h.Cholesterol, 
            h.Weight, 
            h.Timestamp
        FROM patient_health_data h
        JOIN patient_information p ON h.Patient_ID = p.Patient_ID
        OFFSET $1 LIMIT $2;
    `;
    const result = await pool.query(query, [offset, limit]);
    return result.rows;
};

// Fetch all thresholds
exports.getThresholds = async () => {
    const query = 'SELECT Metric, Lower_Limit, Upper_Limit, Unit FROM health_metrics_threshold';
    const result = await pool.query(query);
    return result.rows;
};

// Fetch the ID of the last notification
exports.getLastNotificationId = async () => {
    const query = 'SELECT MAX(id) AS last_id FROM notifications';
    const result = await pool.query(query);
    return result.rows[0]?.last_id || 0;
};


// Save a notification
exports.saveNotification = async (notification) => {
    const query = `
        INSERT INTO notifications 
        (id, patient_id, patient_name, breached_metrics, read)
        VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [
        notification.id,
        notification.patient_id,
        notification.patient_name,
        JSON.stringify(notification.metrics), // Save metrics as JSON string
        notification.read,
    ]);
};
  