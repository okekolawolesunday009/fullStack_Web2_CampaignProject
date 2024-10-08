
import { css, StyleSheet } from 'aphrodite';
import React, { useEffect, useState } from 'react';
import { BiBorderRadius } from 'react-icons/bi';
import './funcard.css';
import { CiFolderOn } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { FURL } from '../../config.js/config'
import axios from 'axios';
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux';
import { deleteCampaignRequest } from '../../actions/campaign/campaignActionCreators';
import { useNavigate } from 'react-router-dom';

const pulseAnimation = {
  '0%': { transform: 'translate(10%, 10%) scale(1)' },
  '50%': { transform: 'translate(25%, 25%) scale(1.2)' },
  '100%': { transform: 'translate(10%, 10%) scale(1)' },
};

const closed = () => {
  return (
    <div className=''>
      <p className='text-red-500'>Closed</p>
    </div>
  )
}

function FunCard({ campaign, isLoggedIn, deleteCampaign}) {
  // console.log(campaign.target, isLoggedIn)

  const navigate = useNavigate()

  const handleDelete = async (e) => {
    const validateDelete = window.confirm('Do you want to delete camapign')
    e.preventDefault()

    if (validateDelete) {
      console.log(campaign._id)
      try {
        await deleteCampaign(campaign._id);
        console.log("Campaign deleted");
        navigate('/dashboard');
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  }

  const handleDetail = (id) => {
    navigate(`/campaign/${id}`)
  }

   
 
  
  return (
    <div className={css(styles.cardContainer)} >
      <div className={css(styles.imageContainer)} onClick={handleDetail(campaign._id)}>
        <img className={css(styles.image)} src={campaign.image} alt={campaign.name} />
      </div>
      <div className={css(styles.innerCard)}>
        <div className={css(styles.imgCategory)}>
          <CiFolderOn size={20} />
          <p className={css(styles.category)}>{campaign.category}</p>
        </div>
        <div className={css(styles.block)}>
          <h3 className={css(styles.title)}>{campaign.name}</h3>
          <p className={css(styles.description)}>{campaign.description}</p>
        </div>
        <div className={css(styles.blockDetails)}>
          <div className={css(styles.detailItem)}>
            <h3 className={css(styles.amount)}>${campaign.target}</h3>
            <p className={css(styles.label)}>Amount Received</p>
          </div>
          <div className={css(styles.detailItem)}>
            <h3 className={`${css(styles.amount)} ${css(styles.active)}`}>
              {campaign.deadline > 0 ? campaign.deadline : closed}
              <span className={`${css(campaign.deadline > 0 ? styles.activeIndicator: '')}`}></span>
            </h3>
            {campaign.deadline > 0 ? <p className={css(styles.label)}>Days left</p> : ""}
          </div>
        </div>
        <div className={`flex justify-between ${isLoggedIn === true ? 'block': 'hidden'}`}>
          <FiEdit3 className='text-green-500'/> 
          <MdDelete className='text-red-500' fill='red ' onClick={handleDelete}/>
        </div>
      </div>
      <div className={css(styles.footer)}>
        <FaRegUserCircle size={16} />
        <h3 className={css(styles.owner)}>{campaign.owner}</h3>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '16rem',
    borderRadius: '15px',
    cursor: 'pointer',
    backgroundColor: '#1f1f2e',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  imageContainer: {
    height: '10rem',
    overflow: 'hidden',
    borderRadius: '15px 15px 0 0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  innerCard: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#f1f1f1',
  },
  imgCategory: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#a1a1b1',
  },
  category: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  block: {
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  description: {
    fontSize: '0.9rem',
    color: '#a1a1b1',
    lineHeight: '1.4',
  },
  blockDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  amount: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  label: {
    color: '#a1a1b1',
    fontSize: '0.8rem',
  },
  active: {
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'green',
    borderRadius: '50%',
    top: '-2px',
    right: '-10px',
    animationName: pulseAnimation,
    animationDuration: '0.6s',
    animationIterationCount: 'infinite',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 0',
    borderTop: '1px solid #2e2e3e',
    fontSize: '0.85rem',
    justifyContent: 'center',
  },
  owner: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
});
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.isUserLoggedIn,
    displayDrawer: state.ui.isNotificationDrawerVisible,
  };
  
};

export const mapDispatchToProps = {
  deleteCampaign:deleteCampaignRequest,

}


export default connect(mapStateToProps, mapDispatchToProps)(FunCard);
