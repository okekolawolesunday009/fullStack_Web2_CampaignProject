import {css,  StyleSheet } from 'aphrodite'
import React from 'react'

function FormField({labelName,name, id,  placeholder, inputType, isTextArea, value, handleChange}) {
  return (
    <label className={css(styles.label)}>
        {labelName && (
            <span className={css(styles.spanText)}
>{labelName}</span>

        )}

        {isTextArea ? (
            <textarea name="" id="" 
            className={css(styles.input)}
            />
            ):
            <input 
                required
                value={value}
                name = {name}
                id = {id}
                onChange={handleChange}
                type={inputType}
                step='0.1'
                placeholder={placeholder}
                className={css(styles.input)}

             />
        }

        


    </label>
  )
}

const styles = StyleSheet.create({
    label: {
        display: 'flex',
        width: '100%',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        color: ''
    },
    spanText:{
        fontWeight: 'bolder',
        fontSize: '14px',
        color: '#808191',
        marginBottom: '10px'
    },
     input: {
        padding: '15px 15px',
        border: '1px solid #3a3a43',
        outline: 'none',
            opacity: '0.5',
            color: 'white',
            fontSize: '14px',
            borderRadius: '10px',
            // ':placeholder': {
            //     color:"$4b5264"
            // },
            minWidth: '150px',
            height: '50px',
            background: "#1c1c24",
        '@media (max-width: 600px)': {
            padding: "25px",  
        }
     }

})
export default FormField