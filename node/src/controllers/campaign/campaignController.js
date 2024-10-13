const Campaign = require('../../models/campaignModel');
const Deadline = require('../../models/deadlineModel');
const Target = require('../../models/targetModel')
const {checkDeadline} = require('../../config.js/checkDeadline');
// const { fileUpload } = require('../imageUpload/fileController');



// const getAll = async (req, res) => {
//     try {
//         const campaigns = await Campaign.find();
//         res.status(200).json({campaigns});
        
//     } catch (err) {
//         res.status(500).json({message: "Internal Server Error - getCampaign"})
//     }
// }


const getAll = async (req, res) => {
    try {
        const campaignProjects = await Campaign.find();
        const campaignIds = campaignProjects.map(campaign => campaign._id)
        const currentDate = new Date();
        // Difference in milliseconds

        const deadlines = await Deadline.find({campaignId: {$in: campaignIds}})
        const targets = await Target.find({campaignId: {$in: campaignIds}})

        const campaigns = campaignProjects.map(campaign => {// this is now, mapped tru the campaign to create a new campaign and then map deadlines and added it to it
            const campaignDeadline = deadlines.find(deadline => 
                String(deadline.campaignId) === String(campaign._id));

                 const targetBalance = targets.find(target => 
                    String(target.campaignId) === String(campaign._id));
                    return {
                        ...campaign.toObject(),
                        target: targetBalance ? targetBalance.targetDeposit : null,
                        deadline: campaignDeadline ? 
                             Math.ceil((campaignDeadline.deadlineDate - currentDate)/  (1000 * 60 * 60 * 24)) : null,
                    }
        })

        // console.log(deadlines, campaigns)
        res.status(200).json({campaigns});
        
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Internal Server Error - getCampaign"})
    }
}
const getById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
        if (!campaign) {
            res.status(404).json({message: "campaign Not Found"})
        }
        res.status(200).json({campaign})
    } catch (err) {
        res.status(500).json({message: "Internal Server Error - getByIdCampaign"})

    }
}

const getUserCampaignsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        // console.log(userId);
        
        const campaigns = await Campaign.find({ user: userId }); // Assuming 'userId' is the field that relates campaigns to users
        
        if (campaigns.length === 0) {
            return res.status(404).json({ message: "No campaigns found for this user" });
        }
        
        res.status(200).json({ campaigns });
    } catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal Server Error - getUserCampaignsByUserId" });
        }
    }
};


const addCampaign = async (req, res) => {
    try {
        // Authorization check first
        if (req.user.role !== 'author') {
            return res.status(403).json({ message: "Unauthorized to add Campaign" });
        }

        const { name, description, category, target, deadline } = req.body;

          // Create new campaign
          const newCampaign = new Campaign({
            name,
            description,
            category,
            image: req.imageUrl || "https://example.com/default-profile-image.jpg" ,// use Cloudinary URL
            // image,
            user: req.user._id,
            target:{
                target,
                targetDeposit : 0,
                targetState: false
            },
            deadline: {
                deadline,
                activeState: checkDeadline(deadline)
            }
        });
        const savedCampaign = await newCampaign.save();
      
      
        
        res.status(200).json({ savedCampaign });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error: AddCampaign" });
    }
};

// console.log(Campaign.schema.paths);

module.exports = {
    getAll,
    getById,
    addCampaign,
    getUserCampaignsByUserId
}