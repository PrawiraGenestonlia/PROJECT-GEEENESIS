import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, DELETEUSER } from '../constants';

export default async (_id) => {
  const url = `${SERVERURL}${DELETEUSER}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "_id": _id
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}