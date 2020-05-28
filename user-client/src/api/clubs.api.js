import axios from 'axios';
import getToken from '../utils/getToken';
import {
  GETCLUBS
} from './constants.api';

export const getClubInfo = async () => {
  let url = GETCLUBS;
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

export const getSpecificClubInfo = async (club_network_name) => {
  let url = GETCLUBS + "?club=" + club_network_name;
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