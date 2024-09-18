const express = require('express');
const { checkCampaignNotifications } = require('../controllers/notificationController');
const  authMiddleware  = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/notifications', authMiddleware, checkCampaignNotifications);  // Protect this route with the middleware

module.exports = router;