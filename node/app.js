const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');
const http = require('http');

const connectDB = require('./src/config.js/db');
const authRoute = require('./src/routes/authRoutes'); // login etc
const campaignRoute = require('./src/routes/campaignRoutes'); // login etc
const targetRoute = require('./src/routes/targetRoutes'); // login etc
const updateCampaignStatus = require('./src/controllers/deadlineController');
const { checkCampaignNotifications } = require('./src/controllers/notificationController');

dotenv.config();

const app = express();
const server = http.createServer(app);  // Use the server for Socket.IO
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSucessStatus: 200
};
app.use(cors(corsOption));

app.use('/api/auth', authRoute);
app.use('/api/campaign', campaignRoute);
app.use('/api/target', targetRoute);

// Cron job running every minute
cron.schedule('*/1 * * * *', () => {
    updateCampaignStatus(); // Also handle deadline
    // checkCampaignNotifications(); // Uncomment this once you handle email notifications properly
    console.log("Cron job running every 1 minute");
});

const PORT = process.env.PORT || 8000;

// Use server.listen instead of app.listen
server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

module.exports = { io };
