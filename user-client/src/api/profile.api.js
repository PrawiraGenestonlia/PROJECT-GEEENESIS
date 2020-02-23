import axios from 'axios';
import getToken from '../utils/getToken';
import {
  GETMYPROFILE
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
