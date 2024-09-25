import React, { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";


const Signup = ({signup}) => {
    const [formData, setFormData] = useState({
        fullName:"",
        email: '',
        password: '',
        region:""
    })

    const {fullName,email, password, region} = formData
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name] : e.target.value
    
        }))
    
      }
      const submit = (e) => {
        e.preventDefault()
        console.log(formData)
        signup(fullName,email, password, region)
        console.log(signup(fullName,email, password, region))
      }
  return (
    <div className=' min-h-screen flex justify-center items-center  '>
    <section className='w-[95%] max-w-md p-8 rounded-2xl bg-[#1c1c24] shadow-lg'>
    <h2 className='text-2xl font-bold text-center text-white mb-6'>Register</h2>
        <form action="m-auto w-full " onSubmit={submit}>
                <div className="flex w-[100%]  flex-col gap-[10px]">
                    <FormField
                    labelName="FullName"
                    placeholder='John Smith'
                    inputType='fullName'
                    name = 'fullName'
                    id = 'fullName'
                    value={fullName}
                    handleChange ={handleChange}
                    />
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

                    <FormField
                    labelName="region"
                    placeholder='Africa'
                    inputType='region'
                    name = 'region'
                    id = 'region'
                    value={region}
                    handleChange ={handleChange}
                    />

                    <div className=" text-sm flex justify-between">
                        <p className='text-[#808191]'>Hav have an account <span  className='text-[#1dc071]'>
                          <Link to={"/login"}>Sign-in</Link></span></p>
                        {/* <p className='text-red-500'>Forgot password</p> */}
                    </div>

                    <div className='flex m-auto justify-between'>
                        <CustomButton

                        btnType="submit"
                        title={'Register'}
                        styles = {`bg-[#1dc071]`}                       
                    
                    />

                    
                    </div>
                </div>

            </form>
      </section>

    </div>
  )
}

export default Signup