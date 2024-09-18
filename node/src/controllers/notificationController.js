const mongoose = require('mongoose');
const Campaign = require('../models/campaignModel');
const Target = require('../models/targetModel');
const sendEmail = require('../config.js/sendEmail');  // Import email sending utility

const checkCampaignNotifications = async () => {
    try {
        const currentDate = new Date();
        

        // Find all campaigns where the deadline is approaching within 7 days
        const campaignsNearDeadline = await Campaign.find({
            deadline: { $gte: currentDate, $lte: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000) },
          
        });

        for (const campaign of campaignsNearDeadline) {
            // Send deadline notification
            sendEmail(
                req.user.email,  // Replace with actual user's email
                'Campaign Deadline Reminder',
                `Reminder: The deadline for campaign "${campaign.name}" is approaching in ${Math.ceil((new Date(campaign.deadline) - currentDate) / (1000 * 60 * 60 * 24))} days.`
            );
        }

        // Find all targets and check if the target has been met
        const targets = await Target.find();
        for (const target of targets) {
            const campaign = await Campaign.findById(target.campaignId);

            // Check if the target has been met
            if (target.targetDeposit >= campaign.target) {
                // Send target met notification
                sendEmail(
                    req.user.email,  // Replace with actual user's email
                    'Target Met Notification',
                    `Congratulations! The target for campaign "${campaign.name}" has been met.`
                );

                // Optionally, mark the campaign or target as completed (you can modify this as per your business logic)
                // target.targetState = true;
                // await target.save();
            }
        }

        console.log('Campaign notifications checked successfully.');
    } catch (error) {
        console.error('Error checking campaign notifications:', error);
    }
};

module.exports = { checkCampaignNotifications };
