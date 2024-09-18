const moongose = require('mongoose')
const Target = require('../models/targetModel')
const Campaign = require('../models/campaignModel')

const updateTargetStatus = async (req, res) =>{//target status, also sends mail
    try {

        const targetCampaign = await Target.findById(req.params.id)
        if (!targetCampaign) {
            return res.status(404).json({ message: 'Target not found' });

        }
        const campaign = await Campaign.findById({"_id": targetCampaign.campaignId})
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
       
        const {targetDeposit} = req.body
        // console.log(campaign._id)
        // console.log(targetCampaign.targetDeposit)
        if (!targetDeposit) {
            return res.status(400).json({ message: 'Target amount is required' });
        }

        const checkTargetMet = (targetPoint, campaignTarget) => {
           return (campaignTarget <= targetPoint) 
        }

       
        // const updatedTarget = new Target({
        //     campaignId: campaign._id,
        //     target: targetCampaign.target,
        //     targetDepoit: addTraget(targetDeposit, targetCampaign.targetDeposit),
        //     targetState :checkTargetMet(targetDeposit, targetCampaign.targetDeposit)
            
        // })

        const updatedDeposit = targetCampaign.targetDeposit + targetDeposit;

        // Update target state based on whether the target has been met
        const targetMet = checkTargetMet(targetCampaign.targetDeposit, targetDeposit);


     
         // Update the target campaign document
         targetCampaign.targetDeposit = updatedDeposit;
         targetCampaign.targetState = targetMet;  // true if the target is met
 
         const updatedTargetCampaign = await targetCampaign.save();
         // const updatedTargetCampaign = await updatedTarget.save()

        console.log("Succesfuly updated target")
        return res.status(200).json({
            message: 'Target updated successfully',
            target: updatedTargetCampaign
        });

    } catch (error) {
      console.error('Error updating target statuses:', error);
      return res.status(500).json({ message: 'Server error: Target Addition' });
    }
}

module.exports = {updateTargetStatus}