
import axios from 'axios';
import {toast} from 'react-toastify'
import { FURL } from '../../config.js/config';
import { CREATE_CAMPAIGN, UPDATE_CAMPAIGN, DELETE_CAMPAIGN, FETCH_CAMPAIGN } from './campaignTypes';


export const addCampaignSuccess = (campaign) => {
    return {
        type: CREATE_CAMPAIGN,
        campaign
    }
}

export const bondAddCampaignSuccess = (campaign) => (dispatch) => dispatch(addCampaignSuccess(campaign))

export const fetchCampaignSuccess = (campaign) => {
    return {
        type: FETCH_CAMPAIGN,
        campaign
    }
}

export const bondfetchCampaignSuccess = (campaign) => (dispatch) => dispatch(fetchCampaignSuccess(campaign))


export const updateCampaignSuccess = (campaign) => {
    return {
        type: UPDATE_CAMPAIGN,
        campaign
    }
}

export const bondUpdateCampaignSuccess = (campaign) => (dispatch) => dispatch(updateCampaignSuccess(campaign))



export const deleteCampaignSuccess = () => {
    return {
        type: DELETE_CAMPAIGN,
    }
}

export const bondDeleteCampaignSuccess = (campaign) => (dispatch) => dispatch(deleteCampaignSuccess(campaign))




export const failureResponse = (error) => {
    return {
        type: 'FAILED REQUEST',
        error
    }
}
export const bondAddCampaignFailure = (error) => (dispatch) => dispatch(failureResponse(error))

export const fetchCampaignRequest = () => async (dispatch) => {
    try {
        const response = await axios.get(`${FURL}/api/campaigns/`)
        dispatch(updateCampaignSuccess(response.data.campaign));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
        toast.success('Succesfully fetched All Campaigns')
        dispatch()
    } catch (error) {
        dispatch(failureResponse(error.response ? error.response.data : error.message));
        toast.error(error.response)

    }
};


export const bondFetchCampaign = (campaign) => (dispatch) => dispatch(fetchCampaignRequest(campaign))



export const updateCampaignRequest = (name, description, category, target, deadline,image) => async (dispatch) => {
    try {
        const response = await axios.put(`${FURL}/api/campaign/update/:id`, 
            { name, description, category, target, deadline,image })
        dispatch(updateCampaignSuccess(response.data.campaign));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
        toast.success('Succesfully Added new Campaign')
        dispatch()
    } catch (error) {
        dispatch(failureResponse(error.response ? error.response.data : error.message));
        toast.error(error.response)

    }
};


export const deleteCampaignRequest = ({form}) => async (dispatch) => {
    try {
        const response = await axios.delete(`${FURL}/api/campaign/:id`, { form })
        dispatch(deleteCampaignSuccess(response.data.campaign));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
        toast.success('Succesfully Added new Campaign')
        dispatch()
    } catch (error) {
        dispatch(failureResponse(error.response ? error.response.data : error.message));
        toast.error(error.response)

    }
};
export const addCampaignRequest = (name, description, category, target, deadline,image) => async (dispatch) => {
    try {
        console.log(name, description, category, target, deadline,image)
        const token = localStorage.getItem('token')
        const response = await axios.post(`${FURL}/api/campaign/new`, 
            { name, description, category, target, deadline,image},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            }
        )
        //  const response = await axios.post("https://fullstack-web2-campaignproject.onrender.com/api/auth/login", { email, password })
        dispatch(addCampaignSuccess(response.data.campaign));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
        toast.success('Succesfully Added new Campaign')
        dispatch()
    } catch (error) {
        dispatch(failureResponse(error.response ? error.response.data : error.message));
        toast.error(error.response)

    }
};
