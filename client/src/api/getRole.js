import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, GETROLE } from '../constants';

export default async () => {
  const url = `${SERVERURL}${GETROLE}`;
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