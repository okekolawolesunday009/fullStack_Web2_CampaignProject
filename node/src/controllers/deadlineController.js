const moongose = require('mongoose')
const Deadlines = require('../models/deadlineModel')
const Campaign = require('../models/campaignModel');
const Deadline = require('../models/deadlineModel');

async function updateCampaignStatus() {
    console.log("deadline check start")
    try {
        const currentDate = new Date();

        const deadlines = await Deadlines.find({activeState: true})
        // console.log(deadlines, "deadlines")

        // const campaignIds = deadlines.map(deadlines => deadlines.campaignId);

        // await Deadlines.updateMany(
        //     {_id: { $in: campaignIds}},
        //     { $set: {activeSate: false}}
        // )

        for (const deadline of deadlines) {
            if (new Date(deadline.deadlineDate) <= currentDate) {
                deadline.activeState = false
                await deadline.save()
                console.log('Campaign statuses updated successfully');

            }
        }
    } catch (error) {
      console.error('Error updating campaign statuses:', error);
    }
}

// const getDeadlineById = async (req, res) => {
//     try {

//         const { deadlineId } = req.params;
//         const deadline = await Deadline.findById(deadlineId)
//         if (!deadline) {
//             res.status(404).json({message: "deadline Not Found"})
//         }
//         res.status(200).json({deadline})
//     } catch (err) {
//         if (!res.headersSent) {
//             return  res.status(500).json({message: 'Internal server Error from Signup '})
//         }


//     }
// }




module.exports = {updateCampaignStatus}