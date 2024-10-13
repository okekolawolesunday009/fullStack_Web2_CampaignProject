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
        const { name, description, category, target, deadline} = req.body;
        
        // Check if all required fields are provided
        if (!name || !description || !category || !target || !deadline) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log(req.params.id)
        
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({message: "Campaign not found"})
        }

       


        const updatedCampaign = await Campaign.findByIdAndUpdate(
            req.params.id, {
                name, 
                description, 
                category, 
                // image,
               image: req.imageUrl || "https://example.com/default-profile-image.jpg" ,// use Cloudinary URL
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
            },
        )

        
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