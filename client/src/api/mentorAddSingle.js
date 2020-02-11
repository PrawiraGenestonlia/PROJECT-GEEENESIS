import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, ADDMENTOR } from '../constants';

export default async (data) => {
  const url = `${SERVERURL}${ADDMENTOR}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "student": data.student.toLowerCase(),
      "mentor": data.mentor.toLowerCase()
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}