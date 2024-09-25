import { css, StyleSheet } from 'aphrodite'
import React from 'react'
import { BiFontSize } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import FunCard from './FunCard'


const DisplayCampaigns = ({title, isLoading, campaigns}) => {

  

  const handleNavigate = () => {
    console.log("clicked")

  }
  return (
    <div className={css(styles.displayContainer)} >
      <h1 className={css(styles.headerTitle)}>
        {title} {`(${campaigns.length})`}
      </h1>
      <div className={css(styles.container)}>
        {isLoading && (
          <p>Loading.....</p>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p>You have not created any campaigns yet</p>
        )}

          {!isLoading && campaigns.length > 0 && campaigns.map
            ((campaign) => <FunCard
              key = {campaign.id}
              campaign = {campaign}
              handleClick ={handleNavigate}

              />)
          }
              
      </div>

    </div>
  )
}

const styles = StyleSheet.create({
  headerTitle:{
    FontSize: '1rem',
    color: 'white',
    fontWeight: 'bolder'
  },
  container:{
    // width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '10px'
    // backgroundColor: 'green'
  },
  displayContainer: {
    padding:'10px',
    marginTop:'10px'
  }

})

export default DisplayCampaigns