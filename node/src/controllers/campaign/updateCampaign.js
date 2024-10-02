const { checkDeadline } = require("../../config.js/checkDeadline");
const { checkTarget } = require("../../config.js/checkTarget");
const Campaign = require("../../models/campaignModel");
const Deadline = require("../../models/deadlineModel");
const Target = require("../../models/targetModel");


const updateCampaign = async (req, res) => {
    try {
        // const {id} = req.user._id
        // const userId = mongoose.Types.ObjectId(req.user._id)

        if ((req.user.role !== 'author')) {
            res.status(403).json({message: "UnAthorized to add Campaign"})
        }
        
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({message: "Campaign not found"})
        }

        const { name, description, category, target, deadline,image } = req.body


        const updatedCampaign = await Campaign.findByIdAndUpdate(
            req.params.id, {
                name, 
                description, 
                category, 
                image,
                user: req.user._id
            },
            {new: true}
        )

        const newDeadline = await Deadline.findOne({campaignId: campaign._id})
        if (!newDeadline) {
            newDeadline = new Deadline({ campaignId: campaign._id });
        }
        newDeadline.deadlineDate = deadline;
        newDeadline.activeState = checkDeadline(deadline)

        const newTarget = await Target.findOne({campaignId: campaign._id})
        if (!newTarget) {
            newTarget = new Target({ campaignId: campaign._id });
        }
        newTarget.target = target;
        newTarget.targetState = checkTarget(target)

        await newTarget.save()
        await newDeadline.save()
        await updatedCampaign.save()



        // console.log(uodateC)
        res.status(200).json(updatedCampaign);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error: Updating Campaign" });
    }
}

module.exports = {
    updateCampaign
}