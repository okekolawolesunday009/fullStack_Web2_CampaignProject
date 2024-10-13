import { css, StyleSheet } from 'aphrodite';
import React, { useEffect, useState } from 'react';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { bgStyles } from '../components/exports';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FURL } from '../config.js/config';
import { fetchCampaignByIdRequest } from '../actions/campaign/campaignActionCreators';
import campaigns from '../components/campaigns';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { formatForDatetimeLocal } from '../components';

// In your useEffect:

const CreateCampaign = ({campaignState, addCampaign, updateCampaign }) => {
  const [form, setForm] = useState({
    name: "",
    category: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState(null)
  const [campaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(false); // Add loading state
  const {id} = useParams()


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
    setLoading(true)

    if (!imageFile) {
      toast.error('Please upload an image'); // Upload the file
      setLoading(false)
      return
    } 
    
  
    try {
      if (id) {
        // Update existing campaign
        const update = await updateCampaign(name, category, description, target, deadline, imageFile, id);
        if (update) return navigate('/dashboard');

        toast.success('Campaign updated successfully');
      } else {
        // Create new campaign
        const add = await addCampaign(name, category, description, target, deadline, imageFile);
        if (add) return navigate('/dashboard');

        toast.success('Campaign created successfully');
      }
    } catch (error) {
      console.error('Error during campaign operation:', error);
      toast.error(`Error ${id ? 'updating' : 'creating'} campaign`);
    } finally {
      setLoading(false);
    }
  
  };

  useEffect(() => {
    console.log(id)

    const fetchCampaign = async () => {
      if (id) {
        try {
          // const response = await fetchCampaignByIdRequest(id);
          const response = await axios.get(`${FURL}/api/campaign/${id}`)
          const campaign = response.data.campaign
          const formattedDate = formatForDatetimeLocal(campaign.createdAt);

          setForm({
            name: campaign.name,
            category: campaign.category,
            description: campaign.description,
            target: campaign.target.target,
            deadline: formattedDate,
            image: campaign.image

          })
        } catch (error) {
          console.log(error);
        }
      } else {
        setForm({
          name: "",
          category: '',
          description: '',
          target: '',
          deadline: '',
          image: ''


        })
      }
    };

    fetchCampaign()

    
  },[id])

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
              title={id ? 
                (loading === true ? <div className="loader">Loading...</div> : 'Update Campaign') 
                : 'Submit new campaign'}
              styles={css(bgDefault.bgColor)}
              disabled={loading}
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
const mapStateToProps = (state) => ({
  campaignState: state.campaigns.isCampaignAdded, // Ensure your reducer is correctly combined in rootReducer
  // userId: state.ui.user._id,
  
})

export const mapDispatchToProps = {
 
  fetchCampaignByIdRequest

}

// Connecting the action to the component
export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign)

