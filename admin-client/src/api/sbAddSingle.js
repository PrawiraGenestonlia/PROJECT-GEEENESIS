import axios from 'axios';
import getToken from '../components/getToken';
import { SERVERURL, ADDSENIORBUDDY } from '../constants';

export default async (data) => {
  const url = `${SERVERURL}${ADDSENIORBUDDY}`;
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(url, {
      "student": data.student.toLowerCase(),
      "senior buddy": data['senior buddy'].toLowerCase()
    }, {
      headers: { "auth-token": token }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err.response);
    })
  })
}