import axios from 'axios';
import getToken from '../utils/getToken';
import {
    GETCHATS,
    POSTCHATS,
    CLEAR_CHAT
} from './constants.api';

export const getChats = async (receiverName) => {
    let url = GETCHATS;
    const token = getToken();
    return new Promise((resolve, reject) => {
        axios.post(url, { "receiverName": receiverName }, {
            headers: { "auth-token": token }
        }).then((res) => {
            if (res.status === 200) resolve(res.data);
        }).catch((err) => {
            if (err.response) reject(err.response.data);
            else reject(err);
        })
    })
}

export const postChats = async (receiverName, message, time) => {
    let url = POSTCHATS;
    const token = getToken();
    return new Promise((resolve, reject) => {
        axios.post(url, {
            "receiverName": receiverName,
            "message": message,
            "time": time
        }, {
            headers: { "auth-token": token }
        }).then((res) => {
            if (res.status === 200) resolve(res.data);
        }).catch((err) => {
            if (err.response) reject(err.response.data);
            else reject(err);
        })
    })
}

export const clearChat = async (receiverName) => {
    let url = CLEAR_CHAT;
    const token = getToken();
    return new Promise((resolve, reject) => {
        axios.post(url, {
            "receiverName": receiverName,
        }, {
            headers: { "auth-token": token }
        }).then((res) => {
            if (res.status === 200) resolve(res.data);
        }).catch((err) => {
            if (err.response) reject(err.response.data);
            else reject(err);
        })
    })
}