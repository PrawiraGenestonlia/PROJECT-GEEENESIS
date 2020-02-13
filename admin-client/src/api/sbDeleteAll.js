import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, DELETEALLSENIORBUDDYS } from '../constants';

export default async () => {
  const url = `${SERVERURL}${DELETEALLSENIORBUDDYS}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}