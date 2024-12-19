const pool = require('../models/db');

exports.getThresholds = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM health_metrics_threshold');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateThreshold = async (req, res) => {
    const { metric, lower_limit, upper_limit } = req.body;

    // Validate input
    if (!metric || lower_limit === undefined || upper_limit === undefined) {
        return res.status(400).json({ error: 'Metric, lower_limit, and upper_limit are required.' });
    }

    try {
        const query = `
        UPDATE health_metrics_threshold
        SET lower_limit = $1, upper_limit = $2
        WHERE metric = $3
        `;

        const result = await pool.query(query, [lower_limit, upper_limit, metric]);

        if (result.rowCount === 0) {
        return res.status(404).json({ error: `Metric '${metric}' not found.` });
        }

        res.status(200).json({ message: `Threshold for '${metric}' updated successfully.` });
    } catch (error) {
        console.error('Error updating threshold:', error.message);
        res.status(500).json({ error: 'An error occurred while updating the threshold.' });
    }
};