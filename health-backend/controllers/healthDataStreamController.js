const { getHealthData, getThresholds, getLastNotificationId, saveNotification } = require('../models/healthDataModel');

exports.streamHealthData = (wss) => {
  let offset = 0; // To track the current row being processed
  let currentNotificationId = 0; // To track the latest notification ID

  const initializeNotificationId = async () => {
    try {
      const lastId = await getLastNotificationId();
      currentNotificationId = lastId || 0;
    } catch (error) {
      console.error('Error initializing notification ID:', error.message);
    }
  };
  initializeNotificationId(); // Initialize the notification ID when the server starts

  setInterval(async () => {
    try {
      // Fetch a single row of health data
      const healthData = await getHealthData(offset, 1); // Get one row at a time
      const thresholds = await getThresholds();

      if (healthData.length === 0) {
        console.log('No more rows to process. Resetting offset.');
        offset = 0;
        return;
      }

      const row = healthData[0];
      const thresholdMap = thresholds.reduce((acc, t) => {
        acc[t.metric.replace(/ /g, '_').toLowerCase()] = {
          lower: t.lower_limit,
          upper: t.upper_limit,
          unit: t.unit,
        };
        return acc;
      }, {});

      // Collect all threshold breaches for this row
      const breachedMetrics = [];

      for (const key in row) {
        if (thresholdMap[key.toLowerCase()]) {
          const metricValue = row[key];
          const threshold = thresholdMap[key.toLowerCase()];

          if (metricValue > threshold.upper || metricValue < threshold.lower) {
            breachedMetrics.push({
              metric: key.replace(/_/g, ' '),
              value: metricValue,
              lower: threshold.lower,
              upper: threshold.upper,
              unit: threshold.unit,
            });
          }
        }
      }

      // If there are breached metrics, create a single notification
      if (breachedMetrics.length > 0) {
        currentNotificationId += 1;
        const alert = {
          id: currentNotificationId,
          patient_id: row.patient_id,
          patient_name: row.name,
          metrics: breachedMetrics, // Array of all breached metrics
          read: false,
        };
        
        // Save the alert to the database
        await saveNotification(alert);

        // Broadcast the alert via WebSocket
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(alert));
          }
        });

        // console.log('Alert Triggered:', alert);
      }

      offset += 1; // Increment offset to process the next row
    } catch (error) {
      console.error('Error streaming health data:', error.message);
    }
  }, 10000); // Process one row every 10 seconds
};
