import React, { useEffect, useState } from 'react'
import DisplayCampaigns from '../HOC/DisplayCampaigns'
// import campaigns from '../components/campaigns'
import { css, StyleSheet } from 'aphrodite'
import { connect } from 'react-redux'
import { failureResponse, fetchCampaignRequest,  fetchCampaignSuccess } from '../actions/campaign/campaignActionCreators'
import axios from 'axios'
import { FURL } from '../config.js/config'
import { jwtDecode } from 'jwt-decode'


const Dashboard = ({
  campaigns, loading, error, 
  fetchCampaign,
  isLoggedIn
}) => {
const [campaignData, setCampaignData] = useState([])



useEffect(() => {
  const fetchData = async () => {


    const token = localStorage.getItem('token');

    const userId = jwtDecode(token).userId
    try {        // dispatch()


      let response
      // console.log(userId.userId)

       if (isLoggedIn && userId) {
        response = await axios.get(`${FURL}/api/campaign/user/${userId}`);
        
       
       } else {
          response = await axios.get(`${FURL}/api/campaign/`);
        
       }
       fetchCampaignSuccess(response.data.campaigns); 
      
      setCampaignData(campaigns);
      fetchCampaign(response.data.campaigns)
    } catch (error) {
      failureResponse(error.response ? error.response.data : error.message); // Dispatch failure to Redux
    }
  };

  fetchData(); // Call the function
}, [fetchCampaignRequest, isLoggedIn]);

//  response = await axios.get(`${FURL}/api/campaign/${userId}`);


  return (  

    <div className={`section ${css(styles.dashboard)}`} >
        <DisplayCampaigns
        title='All Campaign'
        // campaignData = {campaignData}
        campaignData = {campaignData}

        />
        
        
    </div>
  )
}

const styles = StyleSheet.create({
    dashboard:{
        marginTop: '2.5rem',
        width: '100%',
        // backgroundColor: 'red'
    }
  
  })

  Dashboard.defaultProps = {
   
    isLoggedIn: false,
    campaignData:[],
    userId: ''
    
  };
  

  const mapStateToProps = (state) => ({
    campaigns: state.campaigns.campaigns, // Ensure your reducer is correctly combined in rootReducer
    // userId: state.ui.user._id,
    isLoggedIn: state.ui.isUserLoggedIn,
    loading: state.campaigns.loading,
    error: state.campaigns.error
  })

  export const mapDispatchToProps = {
    fetchCampaign:fetchCampaignRequest,


  }
  
  // Connecting the action to the component
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
  