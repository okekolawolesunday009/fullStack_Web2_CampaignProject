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
            image: req.imageUrl,  // use Cloudinary URL
            user: req.user._id
        });

        await newCampaign.save();

        // Create Deadline and Target in parallel
        const newDeadline = new Deadline({
            campaignId: newCampaign._id,
            deadlineDate: deadline,
            activeState: checkDeadline(deadline)
        });

        const newTarget = new Target({
            campaignId: newCampaign._id,
            target,
            targetDeposit: 0,
            targetState: false
        });

        // Save deadline and target
        await Promise.all([newDeadline.save(), newTarget.save()]);

        // Add deadline reference to campaign
        newCampaign.deadline.push(newDeadline._id);
        const savedCampaign = await newCampaign.save();

        // Response
        res.status(200).json({ savedCampaign });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error: AddCampaign" });
    }
};


module.exports = {
    getAll,
    getById,
    addCampaign
}