import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, UPDATEUSER } from '../constants';

export default async (data) => {
  const url = `${SERVERURL}${UPDATEUSER}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "_id": data._id,
      "email": data.email.toLowerCase(),
      "matric": data.matric.toUpperCase(),
      "name": data.name,
      "password": data.password,
      "role": data.role.current.toLowerCase()
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}