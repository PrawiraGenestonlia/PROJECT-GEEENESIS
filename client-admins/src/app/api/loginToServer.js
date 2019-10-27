import Axios from 'axios';
import { SERVERURL, LOGIN } from '../../constants';

export default async (email, password) => {
  const url = `${SERVERURL}${LOGIN}`;
  const res = await Axios.post(url, {
    "email": email,
    "password": password
  })
  return res;
}