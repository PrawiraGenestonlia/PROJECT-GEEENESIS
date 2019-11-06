import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, DELETEEVENT } from '../constants';

export default async (uniqueName) => {
  const url = `${SERVERURL}${DELETEEVENT}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "uniqueName": uniqueName
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}