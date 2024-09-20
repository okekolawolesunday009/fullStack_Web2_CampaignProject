import { css, StyleSheet } from 'aphrodite'
import React from 'react'
import { BiBorderRadius } from 'react-icons/bi'
import './funcard.css';
import { CiFolderOn } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";


const pulseAnimation = {
  '0%': { transform: 'translate(10%, 10%) scale(1)' },
  '50%': { transform: 'translate(25%, 25%) scale(1.2)' },
  '100%': { transform: 'translate(10%, 10%) scale(1)' },
};

function FunCard({campaign,owner, title, decription, target, deadline, amountCollected, image, handleClick}) {

    //const remainingDays = daysLeft(deadline)
  return (

    <div className={css(styles.cardContianer)}>
      <div className='h-[9.9rem]'><img className={`${css(styles.image)} image`} src={campaign.icon} alt={campaign.name}/></div>
      <div className={css(styles.innerCard)}>
        <div className={css(styles.imgCategory)}>
          <CiFolderOn/>

          <p className={css(styles.category)}>
            {campaign.category}
          </p>

        </div>

        <div className={css(styles.block)}>
          <h3 className={`text-white`}>{campaign.title}</h3>
          <p style={{color:'#4b5264'}}>{campaign.description}</p>

        </div>

        <div className={css(styles.block_one)}>
          
          <div className={css(styles.block)}>
            <h3 className={css(styles.block_two)}>{campaign.amountCollected}</h3>
            <p className={css(styles.block_three)}>Amount Received</p>

          </div>


          <div className={css(styles.block)}>
            <h3 className={`${css(styles.block_two,styles.active)}`}>{campaign.deadline}<span className={css(styles.activeIndicator)}></span></h3>
            <p className={css(styles.block_three)}>Days left</p>

          </div>
          </div>

      </div>


        <div className={css(styles.block_four)}>

            <FaRegUserCircle/>
            <h3>{campaign.owner}</h3>

          </div>
    </div>
  )
}

const styles = StyleSheet.create({
    cardContianer: {
        width: '14.9rem',
        borderRadius: '15px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: '#1c1c24',


        
        "@media (max-width: 600px)": {
            width : '16.8rem',

        } 
    },
    innerCard: {
      padding: '1rem',
      display:'flex',
      flexDirection: 'column',
      gap: '10px',
      color: 'white',

    },
    imgCategory: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      color: '#4b5264',
      

    },
    image:{
      height: '100%',
      width: '100%',
      borderRadius: '15px',
      
      
      
    },
    block:{
      
    },
    block_one: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    block_four: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      alignItems:'center',
      fontSize: '12px'

    },
    block_three:{
      color:'#4b5264',
      fontSize: '10px'
    },
    block_two:{
      color:'white',
      fontSize: '12px'

    },
    active: {
      position: "relative"
    },
    activeIndicator: {
      content: '""',
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: 'green',
      borderRadius: '50%',
      top: '10%',
      right: '18px',
      color: "white",
      // transform: 'translate(-50%, -50%)',
      animationName: pulseAnimation,
      animationDuration: '0.6s',
      animationIterationCount: 'infinite',
  },


})

export default FunCard