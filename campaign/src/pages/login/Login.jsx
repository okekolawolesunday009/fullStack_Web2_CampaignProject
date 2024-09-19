import React, { useEffect, useState } from 'react'
import FormField from '../../components/FormField'

import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login = ({login, loginState}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()


    const {email, password} = formData

    const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name] : e.target.value
    
        }))
    
      }

      useEffect(() => {
        if (loginState === true) {
          console.log('User is logged in:', loginState);
          navigate('/dashboard');
        }
      })
    const submit = async (e) => {
        e.preventDefault();

        try {
            // Call the login function passed via props
            await login(email, password);

            // Check if the loginState is updated correctly (you may want to handle this differently)
           
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Error Signing in');
        }
    };
  return (
    <div className=' h-[100vh] flex justify-center items-center  '>
      <section className='w-[368px] rounded-2xl m-auto flex items-center justify-center h-[50%] bg-[#1c1c24]'>
        <form action="m-auto " onSubmit={submit}>
                <div className="flex flex-col gap-[10px]">
                    <FormField
                    labelName="Email"
                    placeholder='Johnsmith@toweraig.com'
                    inputType='email'
                    name = 'email'
                    id = 'email'
                    value={email}
                    handleChange ={handleChange}



                    />
                    <FormField
                    labelName="Password"
                    placeholder='password'
                    inputType='passwrd'
                    name = 'password'
                    id = 'password'
                    value={password}
                    handleChange ={handleChange}



                    />

                    <div className=" text-sm flex justify-between">
                        <p className='text-[#808191]'>Don't have account <span  className='text-[#1dc071]'>Signup</span></p>
                        <p className='text-red-500'>Forgot password</p>
                    </div>

                    <div className='flex m-auto justify-between'>
                        <CustomButton

                        btnType="submit"
                        title={'login'}
                        styles = {`bg-[#1dc071]`}                       
                    
                    />

                    
                    </div>
                </div>

            </form>
      </section>

    </div>
  )
}

export default Login