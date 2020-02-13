import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, GETALLSENIORBUDDYS } from '../constants';

export default async () => {
  const url = `${SERVERURL}${GETALLSENIORBUDDYS}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      reject(err.response.data);
    })
  })
}