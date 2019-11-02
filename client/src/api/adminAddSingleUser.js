import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, ADDUSER } from '../constants';

export default async (data) => {
  const url = `${SERVERURL}${ADDUSER}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "email": data.email.toLowerCase(),
      "matric": data.matric.toUpperCase(),
      "name": data.name,
      "role": data.role.toLowerCase()
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}