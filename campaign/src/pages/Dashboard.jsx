import React, { useEffect, useState } from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns'
import campaigns from '../components/campaigns'
import { css, StyleSheet } from 'aphrodite'
import { connect } from 'react-redux'
import { fetchCampaignRequest } from '../actions/campaign/campaignActionCreators'


const Dashboard = ({campaigns, loading, error, fetchCampaignRequest}) => {


  useEffect(() => {
    fetchCampaignRequest()
  }, [fetchCampaignRequest])


  return (
    <div className={`section ${css(styles.dashboard)}`} >
        <DisplayCampaigns
        title='All Campaign'
        campaigns={campaigns}
        
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
  

  const mapStateToProps = (state) => ({
    campaigns: state.campaigns.campaigns, // Ensure your reducer is correctly combined in rootReducer
    loading: state.campaigns.loading,
    error: state.campaigns.error
  })

  export const mapDispatchToProps = {
    fetchCampaignRequest


  }
  
  // Connecting the action to the component
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
  