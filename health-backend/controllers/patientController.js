const pool = require('../models/db');

exports.getPatients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patient_information');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};