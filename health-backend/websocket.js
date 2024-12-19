const WebSocket = require('ws');
const { streamHealthData } = require('./controllers/healthDataStreamController');

module.exports = (server) => {
  const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });

  // Log when a client connects
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established.');

    // Log disconnection
    ws.on('close', () => {
      console.log('WebSocket connection closed.');
    });

    // Handle errors
    ws.on('error', (err) => {
      console.error('WebSocket error:', err.message);
    });
  });

  // Stream health data to clients
  streamHealthData(wss);
  console.log('WebSocket server is running');
};
