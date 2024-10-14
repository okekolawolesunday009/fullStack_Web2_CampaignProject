import React, { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FURL } from '../../config.js/config';

const Login = ({ login, loginState }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const [visited, setVisited] = useState(false); // Add visited state

  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // useEffect(() => {
  //   if (loginState === true) {
  //     console.log('User is logged in:', loginState);
  //     navigate('/dashboard');
  //   }
  // }, [loginState, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setVisited(true);  // Set the button as visited
    setLoading(true);  // Set the button to loading state
    
    try {
      await login(email, password);
      if (loginState === true) {
        console.log('User is logged in:', loginState);
        navigate('/dashboard');
      } else {
        throw new Error('Login state is false');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Error Signing in');
      setLoading(false);  // Stop loading when login fails
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <section className='w-[95%] max-w-md p-8 rounded-2xl bg-[#1c1c24] shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-white mb-6'>Login</h2>
        <form className='w-full' onSubmit={submit}>
          <div className='flex flex-col gap-4'>
            <FormField
              labelName="Email"
              placeholder='johnsmith@toweraig.com'
              inputType='email'
              name='email'
              id='email'
              value={email}
              handleChange={handleChange}
            />
            <FormField
              labelName="Password"
              placeholder='password'
              inputType='password'
              name='password'
              id='password'
              value={password}
              handleChange={handleChange}
            />
            <div className='text-xs flex justify-between items-center'>
              <p className='text-gray-400'>
                Don't have an account? 
                <Link to="/signup" className='text-[#1dc071] ml-1'>Signup</Link>
              </p>
              <p className='text-red-500 cursor-pointer'>Forgot password?</p>
            </div>
            <CustomButton
              btnType="submit"
              title={loading ? (
                <div className="loader">loading</div> // Loading icon
              ) : 'Login'}
              styles={`bg-[#1dc071] text-white py-2 mt-4 ${visited ? 'bg-green-500' : ''}`} // Add visited class
              disabled={loading} // Disable button while loading
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
