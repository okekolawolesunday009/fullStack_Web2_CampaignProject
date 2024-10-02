import { css, StyleSheet } from 'aphrodite';
import React, { useState } from 'react';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { bgStyles } from '../components/exports';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FURL } from '../config.js/config';

const CreateCampaign = ({ addCampaign }) => {
  const [form, setForm] = useState({
    name: "",
    category: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState(null)

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const navigate = useNavigate();
  const bgDefault = bgStyles("#1dc071");
  const { name, category, description, target, deadline, image } = form;

  const submit = async (e) => {
    e.preventDefault();
    
    // Check if the image is selected
   
    try {
      
      if (!imageFile) {
        toast.error('Please upload an image'); // Upload the file
      } 
      addCampaign(name, category, description, target, deadline, imageFile);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Error creating campaign');
    }
  };

  return (
    <div className={css(styles.container)}>
      <section className={`section create-campaign ${css(styles.section)}`}>
        <div className={css(styles.headerContainer)}>
          <header className='text-xl'>
            <h1 className={`text-sm text-white ${css(styles.headerTitle)}`}>Start a Campaign</h1>
          </header>
        </div>

        <form action="" className={css(styles.form)} onSubmit={submit}>
          <div className={css(styles.formBody)}>
            <FormField
              labelName="Campaign Name"
              placeholder='Food Fest'
              inputType='text'
              name='name'
              id='name'
              value={name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Campaign Category"
              placeholder='Food Fest'
              inputType='text'
              value={category}
              name='category'
              id='category'
              handleChange={handleChange}
            />
            <FormField
              labelName="Story*"
              placeholder='Food Fest'
              inputType='text'
              name="description"
              id='description'
              value={description}
              handleChange={handleChange}
            />
            <div className={css(styles.nb)}>
              <p>You will get 100% of the raised and a campaign card</p>
            </div>
            <FormField
              labelName="Goal*"
              placeholder='$1000'
              value={target}
              inputType='text'
              name='target'
              id='target'
              handleChange={handleChange}
            />
            <FormField
              labelName="End Date*"
              placeholder='12/08/24'
              inputType='datetime-local'
              value={deadline}
              handleChange={handleChange}
              name='deadline'
              id='deadline'
            />
            <FormField
              labelName="Campaign Image *"
              placeholder='image'
              inputType='file'
              handleChange={handleFileChange} // Handle file input separately
              name='image'
              id='image'
            />
            <div className={`submit ${css(styles.submitContainer)}`}>
              <CustomButton
                btnType='submit'
                title='Submit new campaign'
                styles={css(bgDefault.bgColor)}
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: '10px',
    width: '100%',
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3a3a43',
    borderRadius: '10px',
    padding: '16px',
    width: '20%',
    margin: '20px auto',
    '@media (max-width: 600px)': {
      width: "50%",
    },
  },
  container: {
    backgroundColor: '#1c1c24',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: '10px',
    padding: '4px',
    marginTop: '40px',
    '@media (max-width: 600px)': {
      padding: '10px',
    },
  },
  form: {
    display: 'flex',
    gap: '30px',
  },
  formBody: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  nb: {
    color: 'white',
    backgroundColor: '#8c6dfd',
    width: '100%',
    padding: '20px',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
  },
  submitContainer: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
});

export default CreateCampaign;
