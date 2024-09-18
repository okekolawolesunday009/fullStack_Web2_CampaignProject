import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import solana from '../Assets/Header/web3task logo.png'
import { LuLayoutDashboard } from "react-icons/lu";
import navLinks, { theme } from './navItems';
import { bgStyles } from './NavBar';
import { css, StyleSheet } from 'aphrodite';


const SideBar = () => {
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState('notification');
    const bg = bgStyles("#1c1c24");
    const bg2 = bgStyles("green");
    let fSize = 30;
    const size = function () {
      if (window.innerWidth <= 600) fSize = 20;
      else fSize = 30;

    }
    window.addEventListener('resize', size);
    size();

    const activeColor = bgStyles("green");

    const defaultColor = bgStyles("white");

    const Icon = ({name, icon, isActive, disabled, handleClick}) => (
      <div className={`${css(styles.iconContainer)} ${isActive && isActive === name &&
        `${css(bg2.bgColor)} `} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}
      }`} onClick={handleClick} >
        {!isActive ? (
          <img src={icon} alt={`${name}_icon`} className='' width='100px'/>
           
        ): 
          // <img src={icon} alt={`${name}_icon`} width="200px" className={` ${isActive !== name && 'grayscale'}`}/>
         <div className={`${css(styles.icon)}`} onClick={handleClick} > {icon }</div>

        }

      </div>
    )
    




  return (
    <div className={`flex-col justify-between items-center sticky top-5 h-[93vh]`}>
        <Link to="/">
          <Icon styles="w-[32px] h-[32px] bg-[#2c2f32]" icon={solana}/>
          {/* <img src={solana} alt="" /> */}
        </Link>
        <div className={`
        rounded-[20px] ${css(bg.bgColor, styles.sideNav)}  `}>
        
        <div className={`flex-col w-[100%]  ${css(styles.sideList)}`}>
            
          {navLinks.map((link) => (

            <li className={`${css(styles.list)}`} key={link.id}>
              
              <Icon 
                // styles=" bg-[#2c2f32]"

                icon={<link.icon className={`${isActive && isActive ? 'text-white' : "text-black"}`}
                size={fSize}/>}
                name={link.name}
                isActive={isActive}
                handleClick={() => {
                  if(!link.disable) {
                    setIsActive(link.name);
                    navigate(link.link);
                    console.log(link.name)

                }
                }}
              />

            </li>
              

            ))}
        </div>

        <Icon 
                // styles=" bg-[#2c2f32]"
                
                key={theme.id}
                icon={<theme.icon className={`${isActive && isActive ? 'text-wrap' : "text-black"}`}
                size={fSize}/>}
                name={theme.name}

                isActive={isActive}
                handleClick={() => {
                  if(!theme.disabled) {
                    setIsActive(theme.name);
                    navigate(theme.link);
                }
                }}
              />
          

        </div>
     </div>
  )
}

const styles = StyleSheet.create({
  sideList: {
    marginTop: "3rem",
    padding: "0.6rem",
  },
  sideNav : {
    borderRadius: "2rem",
    width: "70%",
    margin: "auto "

  },
  icon :{
    margin: "auto",
    color: "white",
   
    ":active" : {
      color: "green",
      
    },
    ":hover": {
     
    }
  },
  iconContainer:{
    width: "100%",
    height: "3.5rem",
    padding: "0.3rem",
    borderRadius: "0.5rem",


  },
  list:{
    listStyle:"none"
  }
})

export default SideBar;
