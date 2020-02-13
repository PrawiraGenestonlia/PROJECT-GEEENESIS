import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, USER_CHANGEPASSWORD_URL } from '../constants';

export default async (data) => {
  const url = `${SERVERURL}${USER_CHANGEPASSWORD_URL}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "currentPassword": data.currentPassword,
      "newPassword": data.newPassword,
      "newPasswordValidation": data.newPasswordValidation
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}