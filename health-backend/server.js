const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const thresholdRoutes = require('./routes/thresholdRoutes');
const notificationRoutes = require('./routes/notifiactionRoutes');
const setupWebSocket = require('./websocket');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/patients', patientRoutes);
app.use('/api/thresholds', thresholdRoutes);
app.use('/api/notifications', notificationRoutes);

// HTTP and WebSocket server
const server = http.createServer(app);
setupWebSocket();

const port = process.env.SERVER_PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});