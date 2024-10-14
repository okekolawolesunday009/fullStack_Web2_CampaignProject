const { io } = require("../../../app");
const Campaign = require("../../models/campaignModel");



const deleteCampaign = async (req, res) => {

    try {


        const campaign = await Campaign.findByIdAndDelete(req.params.id)
        if (campaign) {
            io.emit('campaignDeleted', { message: 'Campaign deleted successfully', campaign });
        }
        res.status(200).json({message: "Campaign deleted Successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error deleteing Campaign"})
    }
}

module.exports = {
     deleteCampaign
}
