import { LuLayoutDashboard } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { LiaDonateSolid } from "react-icons/lia";
import { PiHandWithdraw } from "react-icons/pi";
import { MdOutlineCampaign } from "react-icons/md";
import { TbUserHexagon } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoColorWandOutline } from "react-icons/io5";





const navLinks = [
     {
        id:1,
        name: 'dashboard',
        icon: LuLayoutDashboard,
        link:"/",
        disable: false
        

     },
     {
        id:2,
        name: 'notification',
        icon: IoNotificationsOutline,
        link:"/notification",
        disable: false


     },
     {
        id:3,
        name: 'donate',
        icon: LiaDonateSolid,
        link:"/",
        disable: true
     },
     {
      id:4,
      name: 'withdraw',
      icon: PiHandWithdraw,
      link:"/",
      disable: true
   },
     {
        id:5,
        name: 'campaign',
        icon: MdOutlineCampaign,
        link:"/",
        disable: false


     },
     {
        id:6,
        name: 'profile',
        icon: TbUserHexagon,
        link:"/",
        disable: false


     },
     {
        id:7,
        name: 'logout',
        icon: IoIosLogOut,
        link:"/",
        disable: false


     },
   
];

export const theme =   {
   id:8,
   name: 'theme',
   icon: IoColorWandOutline,
   link:"/"

}

export default navLinks;

