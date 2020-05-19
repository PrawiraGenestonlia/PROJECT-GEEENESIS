import axios from 'axios';
import getToken from '../utils/getToken';
import {
    GETCHATS,
    POSTCHATS
} from './constants.api';

export const getChats = async (receiverName) => {
    let url = GETCHATS;
    const token = getToken();
    return new Promise((resolve, reject) => {
        axios.post(url, {
            headers: { "auth-token": token }, data: { "receiverName": receiverName }
        }).then((res) => {
            if (res.status === 200) resolve(res.data);
        }).catch((err) => {
            if (err.response) reject(err.response.data);
            else reject(err);
        })
    })
}