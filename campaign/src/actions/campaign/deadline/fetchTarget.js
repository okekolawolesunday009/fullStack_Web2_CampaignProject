import axios from "axios";
import { FURL } from "../../../config.js/config";

const fetchTargetData = async (campaignId) => {
    try {
      const response = await  axios.get(`${FURL}/api/target/${campaignId}`); // Replace with your actual API endpoint
      // setDeadlineData(response.data.deadline.deadlineDate);
      const target = response.data.target.targetDeposit;
      const targetDepo = response.data.target.target;
      const targetDifference = target - targetDepo; // Difference in milliseconds

       // Set the fetched deadline data
       console.log(response.data.target, targetDifference, "function triger");
       return targetDifference


    
    } catch (error) {
      console.error('Error fetching deadline:', error);
    }
}

export default fetchTargetData