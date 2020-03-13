import axios from 'axios';
import getToken from '../utils/getToken';
import {
  GETMYPROFILE,
  GETMYCHATLIST,
  CHANGEAVATAR
} from './constants.api';

export const getMyProfile = async () => {
  let url = GETMYPROFILE;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const getMyChatList = async () => {
  let url = GETMYCHATLIST;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}

export const changeAvatar = async (fileInput) => {
  let url = CHANGEAVATAR;
  const token = getToken();
  const file = fileInput;
  const formData = new FormData();
  formData.append('image', file, file.filename);
  return new Promise((resolve, reject) => {
    axios.post(url, formData, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}