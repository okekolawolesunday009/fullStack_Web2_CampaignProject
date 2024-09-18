import { css, StyleSheet } from 'aphrodite'
import React from 'react'

function CustomButton({btnType, title, handleClick, styles}) {
  return (
    <div>
        <button
        type={btnType}
        className={`${styles} ${css(buttonStyles.button)}`}
        onClick={handleClick}
        >
            {title}
            

        </button>
    </div>
  )
}

const buttonStyles = StyleSheet.create({
  button: {
    color: "white",
    minHeight: "42px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bolder",
    padding: "0px 8px",

    '@media (max-width: 600px)': {
      minHeight: 36,        // Adjust height for smaller screens
      fontSize: 10,
      padding: "0 4px",
    },



  },
  
})

export default CustomButton