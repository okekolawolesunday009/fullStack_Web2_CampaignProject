import {jwtDecode }from 'jwt-decode'

export { default as NavBar} from './NavBar';
export { default as SideBar} from './SideBar'




export const isTokenValid = (token) => {
    if (!token) return false;
  
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
  
    return decodedToken.exp > currentTime; // Check if the token is still valid
  };


  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage
  }

