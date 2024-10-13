// Create Deadline and Target in parallel
        // const newDeadline = new Deadline({
        //     campaignId: newCampaign._id,
        //     deadlineDate: deadline,
        //     activeState: c
        // });

        

        // const newTarget = new Target({
        //     campaignId: newCampaign._id,
        //     target: target,
        //     targetDeposit: 0,
        //     targetState: false
        // });
      
        // // Save deadline and target
        // await Promise.all([newDeadline.save(), newTarget.save()]);

        // Add deadline reference to campaign
        // newCampaign.deadline.push(newDeadline._id);
        // newCampaign.target.push(newTarget._id)

        // await  savedCampaign.save()

        // const allInfo = {
        //     targets: newTarget.target,
        //     deadlines: newDeadline.deadlineDate,
        //     daysRemaining: Math.ceil((newDeadline.deadlineDate - new Date()) / (1000 * 60 * 60 * 24))
        // };

        // const result = {
        //     ...savedCampaign.toObject(),
        //     deadlines:allInfo.deadlines, 
        //     targets:allInfo.targets, 
        //     days: allInfo.daysRemaining 
        // }
        // console.log

        // Response