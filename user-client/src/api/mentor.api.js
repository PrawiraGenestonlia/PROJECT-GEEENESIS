import axios from 'axios';
import getToken from '../utils/getToken';
import {
    SEACH_MENTOR_PROFILE
} from './constants.api';

export const getMentorProfile = async (mentorName) => {
    let url = SEACH_MENTOR_PROFILE;
    const token = getToken();
    return new Promise((resolve, reject) => {
        axios.post(url, { "mentor": mentorName }, {
            headers: { "auth-token": token }
        }).then((res) => {
            if (res.status === 200) resolve(res.data);
            if (res.status === 206) reject(res.data);
        }).catch((err) => {
            if (err.response) reject(err.response.data);
            else reject(err);
        })
    })
}