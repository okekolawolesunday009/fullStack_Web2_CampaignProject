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

  export const formatForDatetimeLocal = (isoDate) => {
    // Create a new Date object
    const date = new Date(isoDate);
    
    // Get the individual components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Return in the format YYYY-MM-DDTHH:MM
    return `${month}/${day}/${year}T${hours}:${minutes}`;
};

export const truncate = (desc, maxlength = 100) => {
  if (desc.length > maxlength) {
    const newText = desc.splice(0, maxlength) + '...'
    return newText

  } else {
    return desc
  }
}