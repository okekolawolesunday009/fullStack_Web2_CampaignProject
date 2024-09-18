import React from 'react'
import DisplayCampaigns from '../components/DisplayCampaigns'
import campaigns from '../components/campaigns'
import { css, StyleSheet } from 'aphrodite'


const Dashboard = () => {
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
  

export default Dashboard