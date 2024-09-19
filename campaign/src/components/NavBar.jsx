import { css, StyleSheet } from 'aphrodite'
import React, { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import CustomButton from './CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import thirdweb from '../Assets/Header/thirdweb.jpg'
import { IoReorderThreeOutline } from 'react-icons/io5'
import navLinks from './navItems'

export const bgStyles = (color) => {

 return StyleSheet.create({
  bgColor:{
    backgroundColor: color
  }
})
}

const NavBar = ({hideNotificationDrawer, displayNotificationDrawer, displayDrawer}) => {

  const navigate = useNavigate();

  const address = 'x0123';

  const bgCreate = bgStyles("#1dc071");
  const bgConnect = bgStyles("#8c6dfc");

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log(displayDrawer)
  })
  return (
    <div className={`${css(styles.navWrapper)} ${css(styles.navBarContainer)} flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6`}>
      <div className={`lg:flex-1 flex items-center ${css(styles.searchContainer)}`}>
        <input type="text" placeholder='Search for campaigns' className={` ${css(styles.input)} flex flex-1 w-full 
        font-epilogue font-normal text-[14px] placeholder:text-[#4b5264]  bg-transparent `} />

        <div className={`m-auto h-full  ${css(styles.search)}`}>
          <LuSearch className=' w-[15px] h-[15px]' size={15} color='white'/>
        </div>  
      </div>


      <div className={`flex justify-center items-center ${css(styles.profileContainer)}`}>
        
      <CustomButton

      btnType="button"
      title={address ? 'create a campaign' : 'Connect'}
      styles = {address ? `${css(bgCreate.bgColor, styles.navButton)}` : `${css(bgConnect.bgColor)}`}
      handleClick={() => {
        if (address) navigate('/campaign/new');
        // else '  ;
      }}
      
      
      />
      <Link to="/profile">
        <div className={`${css(styles.profile)}`}>
          <img src={thirdweb} alt="user" className={`rounded-2xl ${css(styles.profileIcon)}`}/>

        </div>

      </Link>


      <div className={`${css(styles.threeDot)}`}>
        <IoReorderThreeOutline 
        onClick={() => displayNotificationDrawer()}
        className={`${css(styles.navBar)}`}/>

        <div className={`${css(styles.navBarList)} ${displayDrawer === false ? css(styles.hidden) : css(styles.flex)}`}>
           <p className='text-white text-center' onClick={() => hideNotificationDrawer()}>x</p>
            {navLinks.map((link) => (

             <li 
              className={`${css(styles.list)} text-white`}
              key={link.id}
              onClick={() => {
                setIsActive(link.name);
                setToggleDrawer(false);
                navigate(link.link);
              }}>
                <div>{<link.icon/>}</div>
                <p>{link.name}</p>
          
               
              </li>
            ))}
              <CustomButton

              btnType="button"
              title={address ? 'create a campaign' : 'Connect'}
              styles = {address ? `${css(bgCreate.bgColor)}` : `${css(bgConnect.bgColor)}`}
              handleClick={() => {
                if (address) navigate('/campaign/new');
                // else '  ;
              }}


              />


            
        </div>

      </div>

      </div>
          {/* <img src={solana} alt="" /> */}



    </div>
  )
}

const styles = StyleSheet.create({
 search: {
  width: "4.5rem",
  height:" 2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1.3rem",
  cursor:"pointer",
  backgroundColor: "#4acd8d",
  
  '@media (max-width: 600px)': {
    width: "3.9rem",
    height: "1.4rem",
  },
  
 },
 searchContainer: {
  width: "22.3rem",
  maxWidth: "468px",
  height: "3.3rem",
  backgroundColor: "#1c1c24",
  padding: "10px",
  borderRadius: "100px",
  '@media (max-width: 600px)': {
    width: "15.4rem",        // Adjust height for smaller screens
    margin: '0 auto',
    // height: "2rem",
    padding: "6px",
  },


  
 },
 input : {
  background: "none",
  outline: "none",
  color: "white",
  '@media (max-width: 600px)': {
   fontSize: 9,// Adjust height for smaller screens
   width: "100px", 

  },

 }, 
 navWrapper: {
  display: 'flex',
  //backgroundColor: "red",
  justifyContent: "space-between"
 },
  profile: {
    width: "3.3rem",
    height: "3.3rem",
    // borderRadius: "20px",
    marginLeft: "10px",
    '@media (max-width: 600px)': {
    width: "2rem",        // Adjust height for smaller screens
    height: "2rem",
  },
  },
  profileIcon: {
    borderRadius: "1.6rem"
  },
  profileContainer: {
    alignItems: "center"
  },
  navBarContainer:{
    // display:"none",
    position: "relative",
    
  },
  navBar:{
     height: "2rem",
      width: "2rem",
      marginLeft: "4px",
      color: "white",
      cursor:"pointer",
   
    '@media (max-width: 600px)': {
          // Adjust height for smaller screens
     
   }
  }, 
  navBarList: {
    position: "absolute",
    top: "5px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#1c1c24",       // Adjust height for smaller screens
    right: "0",
    left: 0,
    display: "none",
    flexDirection: "column",
    gap: "6px",
    // zIndex: 9999,
    // width: "100%"
  
  }, 

    // ... other styles,
    hidden: {
      display: 'none',
    },
    flex: {
      display: 'flex',
    },
  
  threeDot : {
    display: "none",
    '@media (max-width: 600px)': {
      display: "flex", 
    
    }

  },
  list : {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    gap: "6px"

  },
  navButton: {
    '@media (max-width: 600px)': {
     display: "none",

   }
  }
})


export default NavBar