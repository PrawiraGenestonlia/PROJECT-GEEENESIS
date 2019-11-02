import axios from 'axios';
import { SERVERURL, LOGIN } from '../constants';

export default async (email, password) => {
  const url = `${SERVERURL}${LOGIN}`;
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "email": email.toLowerCase(),
      "password": password
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}