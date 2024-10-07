const Campaign = require("../../models/campaignModel");
const Deadline = require("../../models/deadlineModel");
const Target = require("../../models/targetModel");



const deleteCampaign = async (req, res) => {

    try {


        await Campaign.findByIdAndDelete(req.params.id)
        await Deadline.findOneAndDelete({campaignId: campaign._id})
        await Target.findOneAndDelete({campaignId: campaign._id})
        res.status(200).json({message: "Campaign deleted Successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error deleteing Campaign"})
    }
}

module.exports = {
     deleteCampaign
}
