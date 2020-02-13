import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, UPDATEEVENT } from '../constants';

export default async (eventInfo) => {
  const url = `${SERVERURL}${UPDATEEVENT}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      ...eventInfo
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      if (res.status === 200) resolve(res);
    }).catch((err) => {
      if (err.response) reject(err.response.data);
      else reject(err);
    })
  })
}