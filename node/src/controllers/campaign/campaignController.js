const Campaign = require('../../models/campaignModel');
const Deadline = require('../../models/deadlineModel');
const Target = require('../../models/targetModel')
const {checkDeadline} = require('../../config.js/checkDeadline')

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
        const campaigns = await Campaign.find();
        const campaignIds = campaigns.map(campaign => campaign._id)
        const currentDate = new Date();
        // Difference in milliseconds

        const deadlines = await Deadline.find({campaignId: {$in: campaignIds}})
        const targets = await Target.find({campaignId: {$in: campaignIds}})

        const campaignsWithDeadlines = campaigns.map(campaign => {// this is now, mapped tru the campaign to create a new campaign and then map deadlines and added it to it
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

        console.log(deadlines, campaignsWithDeadlines)
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
            res.status(404).json({message: "Product Not Found"})
        }
        res.status(200).json({campaign})
    } catch (err) {
        res.status(500).json({message: "Internal Server Error - getByIdCampaign"})

    }
}

const addCampaign = async (req, res) => {
    try {
        // const {id} = req.user._id
        // const userId = mongoose.Types.ObjectId(req.user._id)

        if ((req.user.role !== 'author')) {
            res.status(403).json({message: "UnAthorized to add Campaign"})
        }
        const { name, description, category, target, deadline,image } = req.body
        console.log(req.body)


        const newCampaign = new Campaign ({
            name, 
            description,
            category, 
            image,
            user: req.user._id
        })
        
        await newCampaign.save()
        const newDeadline = new Deadline ({
            campaignId: newCampaign._id,
            deadlineDate: deadline,
            activeState :checkDeadline(deadline)
        })

        const newTarget = new Target({
            campaignId: newCampaign._id,
            target: target,
            targetDeposit: 0,
            targetState : false

        })
        console.log(newTarget);
        await newDeadline.save()
        newCampaign.deadline.push(newDeadline._id)
        await newTarget.save()

        //save again

        const savedCampaign = await newCampaign.save()
        // console.log(savedCampaign)
        res.status(200).json({savedCampaign})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Internal Server Error: AddCampaign"})
    }
}



module.exports = {
    getAll,
    getById,
    addCampaign
}